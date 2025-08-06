import { processMessage } from './aiService.js';
import { saveConversation, createOrUpdateSession } from './database.js';

// Store active connections
const activeConnections = new Map();

function setupWebSocketHandlers(io) {
  io.on('connection', (socket) => {
    console.log(`🔌 New WebSocket connection: ${socket.id}`);
    
    // Store connection info
    activeConnections.set(socket.id, {
      socket,
      sessionId: null,
      connectedAt: new Date(),
      lastActivity: new Date()
    });

    // Handle session initialization
    socket.on('init_session', async (data) => {
      try {
        const { sessionId, userAgent } = data;
        
        // Create or update session in database
        await createOrUpdateSession(sessionId, userAgent, socket.handshake.address);
        
        // Update connection info
        const connection = activeConnections.get(socket.id);
        if (connection) {
          connection.sessionId = sessionId;
          connection.lastActivity = new Date();
        }

        socket.emit('session_initialized', {
          sessionId,
          timestamp: new Date().toISOString()
        });

        console.log(`✅ Session initialized: ${sessionId}`);
        
      } catch (error) {
        console.error('❌ Session initialization error:', error);
        socket.emit('error', {
          message: 'Failed to initialize session',
          error: error.message
        });
      }
    });

    // Handle real-time chat messages
    socket.on('chat_message', async (data) => {
      try {
        const { message, sessionId, conversationHistory = [] } = data;
        
        console.log(`💬 Processing message from ${sessionId}: "${message.substring(0, 50)}..."`);
        
        // Update connection activity
        const connection = activeConnections.get(socket.id);
        if (connection) {
          connection.lastActivity = new Date();
        }

        // Process message with AI
        const aiResponse = await processMessage(message, conversationHistory);
        
        // Save conversation to database
        const conversationData = {
          sessionId,
          userMessage: message,
          aiResponse: aiResponse.response,
          intent: aiResponse.intent,
          confidence: aiResponse.confidence
        };
        
        await saveConversation(conversationData);
        
        // Send response back to client
        socket.emit('ai_response', {
          response: aiResponse.response,
          intent: aiResponse.intent,
          confidence: aiResponse.confidence,
          suggestions: aiResponse.suggestions,
          timestamp: new Date().toISOString()
        });

        console.log(`✅ AI response sent to ${sessionId}`);
        
      } catch (error) {
        console.error('❌ Chat message processing error:', error);
        socket.emit('error', {
          message: 'Failed to process message',
          error: error.message
        });
      }
    });

    // Handle voice audio streaming
    socket.on('voice_stream', async (data) => {
      try {
        const { audioChunk, sessionId, isFinal } = data;
        
        // This would typically process audio chunks
        // For now, we'll just acknowledge receipt
        socket.emit('voice_ack', {
          received: true,
          timestamp: new Date().toISOString()
        });

        if (isFinal) {
          // Process final audio chunk
          console.log(`🎤 Final voice chunk received from ${sessionId}`);
          
          // Here you would:
          // 1. Convert audio to text using Whisper
          // 2. Process the text with AI
          // 3. Convert response back to speech
          // 4. Stream audio response back
          
          socket.emit('voice_response', {
            audioUrl: '/api/voice/synthesize', // Placeholder
            text: "Voice processing would happen here",
            timestamp: new Date().toISOString()
          });
        }
        
      } catch (error) {
        console.error('❌ Voice stream processing error:', error);
        socket.emit('error', {
          message: 'Failed to process voice stream',
          error: error.message
        });
      }
    });

    // Handle typing indicators
    socket.on('typing_start', (data) => {
      const { sessionId } = data;
      socket.broadcast.emit('user_typing', {
        sessionId,
        isTyping: true,
        timestamp: new Date().toISOString()
      });
    });

    socket.on('typing_stop', (data) => {
      const { sessionId } = data;
      socket.broadcast.emit('user_typing', {
        sessionId,
        isTyping: false,
        timestamp: new Date().toISOString()
      });
    });

    // Handle user presence
    socket.on('user_present', (data) => {
      const { sessionId, status } = data;
      socket.broadcast.emit('user_status', {
        sessionId,
        status, // 'online', 'away', 'busy'
        timestamp: new Date().toISOString()
      });
    });

    // Handle appointment booking requests
    socket.on('book_appointment', async (data) => {
      try {
        const { sessionId, appointmentData } = data;
        
        console.log(`📅 Appointment booking request from ${sessionId}`);
        
        // This would typically save to database and send confirmation
        socket.emit('appointment_booked', {
          success: true,
          appointmentId: `apt_${Date.now()}`,
          message: 'Appointment booked successfully',
          timestamp: new Date().toISOString()
        });
        
      } catch (error) {
        console.error('❌ Appointment booking error:', error);
        socket.emit('error', {
          message: 'Failed to book appointment',
          error: error.message
        });
      }
    });

    // Handle ping/pong for connection health
    socket.on('ping', () => {
      socket.emit('pong', {
        timestamp: new Date().toISOString()
      });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`🔌 WebSocket disconnected: ${socket.id}`);
      
      // Remove from active connections
      activeConnections.delete(socket.id);
      
      // Broadcast user offline status
      const connection = activeConnections.get(socket.id);
      if (connection && connection.sessionId) {
        socket.broadcast.emit('user_status', {
          sessionId: connection.sessionId,
          status: 'offline',
          timestamp: new Date().toISOString()
        });
      }
    });

    // Handle errors
    socket.on('error', (error) => {
      console.error('❌ WebSocket error:', error);
    });
  });

  // Broadcast system messages to all connected clients
  function broadcastSystemMessage(message, type = 'info') {
    io.emit('system_message', {
      message,
      type,
      timestamp: new Date().toISOString()
    });
  }

  // Get connection statistics
  function getConnectionStats() {
    return {
      totalConnections: activeConnections.size,
      connections: Array.from(activeConnections.entries()).map(([id, conn]) => ({
        id,
        sessionId: conn.sessionId,
        connectedAt: conn.connectedAt,
        lastActivity: conn.lastActivity
      }))
    };
  }

  // Clean up inactive connections
  setInterval(() => {
    const now = new Date();
    const inactiveThreshold = 5 * 60 * 1000; // 5 minutes
    
    for (const [id, connection] of activeConnections.entries()) {
      if (now - connection.lastActivity > inactiveThreshold) {
        console.log(`🕐 Cleaning up inactive connection: ${id}`);
        connection.socket.disconnect();
        activeConnections.delete(id);
      }
    }
  }, 60000); // Check every minute

  // Expose utility functions
  io.broadcastSystemMessage = broadcastSystemMessage;
  io.getConnectionStats = getConnectionStats;
}

export {
  setupWebSocketHandlers
}; 