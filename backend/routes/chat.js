import express from 'express';
import { processMessage } from '../services/aiService.js';
import { saveConversation, getConversationHistory } from '../services/database.js';
import { validateMessage } from '../middleware/validation.js';

const router = express.Router();

// Chat endpoint - handles AI conversations
router.post('/', validateMessage, async (req, res) => {
  try {
    const { message, conversationHistory = [], sessionId } = req.body;
    
    console.log(`🤖 Processing message: "${message.substring(0, 50)}..."`);
    
    // Process the message with AI
    const aiResponse = await processMessage(message, conversationHistory);
    
    // Save conversation to database
    const conversationData = {
      sessionId: sessionId || `session_${Date.now()}`,
      userMessage: message,
      aiResponse: aiResponse.response,
      timestamp: new Date(),
      intent: aiResponse.intent,
      confidence: aiResponse.confidence
    };
    
    await saveConversation(conversationData);
    
    res.json({
      success: true,
      response: aiResponse.response,
      intent: aiResponse.intent,
      confidence: aiResponse.confidence,
      suggestions: aiResponse.suggestions,
      sessionId: conversationData.sessionId
    });
    
  } catch (error) {
    console.error('❌ Chat processing error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process message',
      message: error.message
    });
  }
});

// Get conversation history
router.get('/history/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const history = await getConversationHistory(sessionId);
    
    res.json({
      success: true,
      history,
      sessionId
    });
    
  } catch (error) {
    console.error('❌ Error fetching conversation history:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch conversation history'
    });
  }
});

// Get conversation suggestions
router.get('/suggestions', async (req, res) => {
  try {
    const suggestions = [
      "Tell me about your services",
      "What are your development timelines?",
      "How much do your services cost?",
      "Book a consultation call",
      "What technologies do you use?",
      "Can you help with AI integration?",
      "What's your development process?",
      "Do you provide maintenance support?"
    ];
    
    res.json({
      success: true,
      suggestions
    });
    
  } catch (error) {
    console.error('❌ Error fetching suggestions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch suggestions'
    });
  }
});

// Voice processing endpoint
router.post('/voice', async (req, res) => {
  try {
    // This endpoint would handle audio file uploads
    // For now, we'll return a placeholder response
    res.json({
      success: true,
      message: 'Voice processing endpoint ready for implementation'
    });
    
  } catch (error) {
    console.error('❌ Voice processing error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process voice input'
    });
  }
});

export default router; 