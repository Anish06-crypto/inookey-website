import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, MessageCircle, X, Volume2, VolumeX } from 'lucide-react';
import VoiceAssistantAvatar from './VoiceAssistantAvatar';
import ChatInterface from './ChatInterface';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface VoiceAssistantProps {
  isVisible: boolean;
  onToggle: () => void;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ isVisible, onToggle }) => {
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showChat, setShowChat] = useState(false); // Start with chat closed
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);

  // Reset chat state when assistant becomes visible
  useEffect(() => {
    if (isVisible) {
      setShowChat(false); // Start with chat closed to show speech bubble
    }
  }, [isVisible]);

  // Speech bubble animation - only show when chat is closed
  useEffect(() => {
    if (!isVisible || showChat) return; // Don't show if chat is open

    const interval = setInterval(() => {
      setShowSpeechBubble(true);
      
      // Hide after 2 seconds
      setTimeout(() => {
        setShowSpeechBubble(false);
      }, 2000);
    }, 4000); // Show every 4 seconds (2 seconds visible + 2 seconds hidden)

    return () => clearInterval(interval);
  }, [isVisible, showChat]);

  // Initialize speech recognition
  useEffect(() => {
    // Initialize speech synthesis and log available voices
    if (window.speechSynthesis) {
      synthesisRef.current = window.speechSynthesis;
      
      // Wait for voices to be loaded, then log them
      const logVoices = () => {
        const voices = synthesisRef.current?.getVoices() || [];
        console.log('Available voices:', voices.map(v => `${v.name} (${v.lang})`));
      };
      
      if (synthesisRef.current.getVoices().length > 0) {
        logVoices();
      } else {
        synthesisRef.current.addEventListener('voiceschanged', logVoices, { once: true });
      }
    }

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript(finalTranscript || interimTranscript);
        
        if (finalTranscript) {
          handleUserMessage(finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }

    synthesisRef.current = window.speechSynthesis;
  }, []);

  const handleUserMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);

    try {
      // Send to backend for AI processing
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          conversationHistory: messages
        })
      });

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Speak the response if not muted
      if (!isMuted) {
        speakText(data.response);
      }
    } catch (error) {
      console.error('Error processing message:', error);
    } finally {
      setIsProcessing(false);
      setTranscript('');
    }
  };

  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  }, [isListening]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
    }
  };

  const speakText = async (text: string) => {
    if (isMuted) return;
    
    // Clean up text for more natural speech
    const cleanedText = text
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markdown
      .replace(/\*(.*?)\*/g, '$1') // Remove italic markdown
      .replace(/\n\n/g, '... ') // Replace double newlines with pauses
      .replace(/\n/g, ', ') // Replace single newlines with commas
      .replace(/\t/g, ', ') // Replace tabs with commas
      .replace(/:/g, '... ') // Replace colons with longer pauses
      .replace(/;/g, '... ') // Replace semicolons with pauses
      .replace(/,([^\s])/g, ', $1') // Ensure space after commas
      .replace(/\.([^\s])/g, '. $1') // Ensure space after periods
      .replace(/!([^\s])/g, '! $1') // Ensure space after exclamations
      .replace(/\?([^\s])/g, '? $1') // Ensure space after questions
      .replace(/([.!?])\s*([A-Z])/g, '$1... $2') // Add pauses between sentences
      .replace(/\s+/g, ' ') // Remove extra spaces
      .trim();

    try {
      // Try to use Coqui TTS server first (much better quality)
      console.log('🔄 Attempting to use Coqui TTS for:', cleanedText.substring(0, 50) + '...');
      
      const controller = new AbortController();
      // Dynamic timeout based on text length (minimum 15 seconds, +2 seconds per 100 characters)
      const timeoutMs = Math.max(15000, 15000 + Math.floor(cleanedText.length / 100) * 2000);
      console.log(`⏱️ Setting timeout to ${timeoutMs}ms for ${cleanedText.length} characters`);
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
      
      const response = await fetch('http://localhost:5001/synthesize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: cleanedText,
          voice: 'ljspeech'
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      if (response.ok) {
        const audioBlob = await response.blob();
        console.log(`📊 Audio blob size: ${audioBlob.size} bytes, type: ${audioBlob.type}`);
        
        // Check if we actually got audio data
        if (audioBlob.size > 1000) { // Audio should be at least 1KB
          const audio = new Audio(URL.createObjectURL(audioBlob));
          audio.volume = 0.9;
          
          // Add more detailed error handling for audio playback
          audio.onerror = (e) => {
            console.error('🚨 Audio playback error:', e);
            console.error('Audio src:', audio.src);
            console.error('Audio readyState:', audio.readyState);
            console.log('🔄 Retrying with browser TTS...');
            playWithBrowserTTS();
          };
          
          audio.onloadstart = () => console.log('🎵 Audio loading started');
          audio.oncanplay = () => console.log('🎵 Audio can play');
          audio.onplay = () => console.log('▶️ Audio playback started');
          audio.onended = () => console.log('⏹️ Audio playback ended');
          
          try {
            // Ensure the audio is ready before playing
            await new Promise((resolve, reject) => {
              audio.oncanplaythrough = resolve;
              audio.onerror = reject;
              audio.load(); // Force reload of the audio
            });
            
            await audio.play();
            console.log('🎤 SUCCESS: Using Coqui TTS (Natural Voice)');
            return;
          } catch (playError) {
            console.error('🚨 Audio play() failed:', playError);
            if (playError instanceof Error) {
              console.error('Play error details:', {
                name: playError.name,
                message: playError.message,
                code: (playError as any).code
              });
            } else {
              console.error('Play error (non-Error object):', playError);
            }
            console.log('🔄 Falling back to browser TTS...');
          }
        } else {
          console.log(`⚠️ Received small audio data (${audioBlob.size} bytes), falling back to browser TTS`);
        }
      } else {
        console.log(`⚠️ TTS server error: ${response.status}, falling back to browser TTS`);
      }
    } catch (error) {
      console.log('⚠️ Coqui TTS unavailable, falling back to browser TTS:', error);
    }

    // Fallback function
    const playWithBrowserTTS = () => {
      // Fallback to browser TTS if Coqui TTS is not available
      if (!synthesisRef.current) return;
      
      const utterance = new SpeechSynthesisUtterance(cleanedText);
      utterance.rate = 0.75; // Slower for more conversational feel
      utterance.pitch = 1.1; // Slightly higher for friendlier tone
      utterance.volume = 0.9;
      
      // Try to use the best available female voice
      const voices = synthesisRef.current.getVoices();
      const preferredVoices = [
        'Samantha', 'Susan', 'Allison', 'Ava', 'Serena', 'Zira', 'Hazel',
        'Microsoft Zira', 'Microsoft Eva', 'Google UK English Female',
        'Google US English', 'Alex', 'Karen', 'Moira', 'Tessa', 'Veena'
      ];
      
      let selectedVoice = null;
      for (const voiceName of preferredVoices) {
        selectedVoice = voices.find(voice => 
          voice.name.toLowerCase().includes(voiceName.toLowerCase())
        );
        if (selectedVoice) break;
      }
      
      if (!selectedVoice) {
        selectedVoice = voices.find(voice => 
          voice.name.toLowerCase().includes('female') || 
          voice.name.toLowerCase().includes('woman') ||
          voice.name.toLowerCase().includes('girl')
        );
      }
      
      if (!selectedVoice) {
        selectedVoice = voices.find(voice => 
          (voice.lang.startsWith('en') && !voice.name.toLowerCase().includes('male')) ||
          voice.name.toLowerCase().includes('english')
        );
      }
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
        console.log('🔊 Using browser TTS:', selectedVoice.name);
      }
      
      synthesisRef.current.speak(utterance);
    };

    // Call the fallback function
    playWithBrowserTTS();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Main Assistant Container */}
        <div className="relative">
          {/* Chat Interface */}
          <AnimatePresence>
            {showChat && (
              <motion.div
                className="mb-4"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <ChatInterface 
                  messages={messages}
                  onSendMessage={handleUserMessage}
                  onSpeak={speakText}
                  isMuted={isMuted}
                  isListening={isListening}
                  onToggleListening={toggleListening}
                  onToggleMute={toggleMute}
                  onMinimize={() => setShowChat(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Speech Bubble - positioned higher when chat is closed */}
          <AnimatePresence>
            {showSpeechBubble && (
              <motion.div
                className="absolute -left-48 top-1/2 transform -translate-y-1/2 -translate-y-8 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl px-4 py-3 shadow-2xl z-10"
                initial={{ opacity: 0, scale: 0.8, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                onClick={() => setShowChat(true)}
              >
                <div className="flex items-center gap-2 cursor-pointer">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <p className="text-gray-800 text-sm font-medium whitespace-nowrap">
                    Hi, How can I help?
                  </p>
                </div>
                
                {/* Speech bubble tail pointing to chat button */}
                <div className="absolute right-0 bottom-2 transform translate-x-2">
                  <div className="w-0 h-0 border-l-8 border-l-white/95 border-t-6 border-t-transparent border-b-6 border-b-transparent"></div>
                  <div className="absolute -left-1 top-0 w-0 h-0 border-l-6 border-l-gray-200/50 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat Icon Button */}
          <motion.button
            onClick={() => {
              console.log('Chat icon clicked, toggling chat');
              setShowChat(!showChat);
            }}
            className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.9 }}
            title={showChat ? "Close Chat" : "Open Chat"}
          >
            <MessageCircle size={24} />
          </motion.button>

          {/* Transcript Display */}
          {transcript && (
            <motion.div
              className="absolute bottom-20 right-0 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-4 max-w-sm shadow-2xl"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-600 font-medium">Listening...</span>
              </div>
              <p className="text-gray-800 text-sm leading-relaxed">{transcript}</p>
              <div className="flex gap-1 mt-3 justify-center">
                <div className="w-1.5 h-1.5 bg-gradient-to-r from-red-400 to-pink-500 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-gradient-to-r from-red-400 to-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1.5 h-1.5 bg-gradient-to-r from-red-400 to-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </motion.div>
          )}


        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VoiceAssistant; 