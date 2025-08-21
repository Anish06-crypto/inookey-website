import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import ChatInterface from './ChatInterface';

interface VoiceAssistantProps {
  isVisible: boolean;
  onToggle: () => void;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ isVisible, onToggle }) => {
  const [isListening, setIsListening] = useState(false);
  const [showChat, setShowChat] = useState(false); // Start with chat closed
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
    // Disabled for now - show coming soon message
    return;
  };

  const toggleListening = useCallback(() => {
    // Disabled for now
    return;
  }, []);

  const toggleMute = () => {
    // Disabled for now
    return;
  };

  const speakText = async (text: string) => {
    // Disabled for now
    return;
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
                className="mb-4 relative"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* Coming Soon Overlay */}
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-2xl z-20 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle size={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Coming Soon</h3>
                    <p className="text-gray-300 text-sm max-w-xs">
                      Our AI assistant is getting smarter every day. Stay tuned for an amazing experience!
                    </p>
                    <button
                      onClick={() => setShowChat(false)}
                      className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors duration-200"
                    >
                      Close
                    </button>
                  </div>
                </div>

                {/* Blurred Chat Interface */}
                <div className="filter blur-sm pointer-events-none">
                  <ChatInterface 
                    messages={[]} // No messages to display in this simplified version
                    onSendMessage={handleUserMessage}
                    onSpeak={speakText}
                    isMuted={false} // No mute functionality
                    isListening={isListening}
                    onToggleListening={toggleListening}
                    onToggleMute={toggleMute}
                    onMinimize={() => setShowChat(false)}
                  />
                </div>
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