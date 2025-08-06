import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { Send, Volume2, VolumeX, User, Bot, X, Mic, MicOff, MoreHorizontal, ChevronDown, Minimize2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  onSpeak: (text: string) => void;
  isMuted: boolean;
  isListening: boolean;
  onToggleListening: () => void;
  onToggleMute: () => void;
  onMinimize?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  onSendMessage,
  onSpeak,
  isMuted,
  isListening,
  onToggleListening,
  onToggleMute,
  onMinimize
}) => {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [shouldPulse, setShouldPulse] = useState(true);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Pulsing effect every 3 seconds to attract attention to suggestions menu
  useEffect(() => {
    const interval = setInterval(() => {
      setShouldPulse(true);
      setTimeout(() => setShouldPulse(false), 1000); // Pulse for 1 second
    }, 3000); // Every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showSuggestions && menuButtonRef.current && !menuButtonRef.current.contains(event.target as Node)) {
        // Check if click is not on the portal menu
        const target = event.target as Element;
        if (!target.closest('[data-suggestions-menu]')) {
          setShowSuggestions(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSuggestions]);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      onSendMessage(inputText.trim());
      setInputText('');
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleMenuToggle = () => {
    if (!showSuggestions && menuButtonRef.current) {
      const rect = menuButtonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right
      });
    }
    setShowSuggestions(!showSuggestions);
  };

  return (
    <motion.div
      className="w-96 h-[500px] bg-black/90 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-xl border-b border-white/10 p-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center ring-2 ring-white/20">
              <Bot size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Inookey AI</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <p className="text-white/80 text-sm">Ready to help</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {/* Suggestions Menu */}
            <div className="relative">
              <motion.button
                ref={menuButtonRef}
                onClick={handleMenuToggle}
                className={`relative p-3 rounded-full transition-all duration-300 ${
                  showSuggestions 
                    ? 'bg-white/30 text-white shadow-lg' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="Suggested questions"
              >
                <MoreHorizontal size={16} />
                
                {/* Pulsing glow effect */}
                <AnimatePresence>
                  {shouldPulse && !showSuggestions && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-white/40"
                      initial={{ scale: 1, opacity: 0.4 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      exit={{ scale: 1, opacity: 0 }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  )}
                </AnimatePresence>
                
                {/* Notification dot */}
                {!showSuggestions && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.button>
              

            </div>

            {/* Minimize Button */}
            {onMinimize && (
              <motion.button
                onClick={onMinimize}
                className="p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="Minimize chat"
              >
                <Minimize2 size={16} />
              </motion.button>
            )}

            <motion.button
              onClick={() => onSpeak("Hello! I'm your Inookey AI assistant. How can I help you today?")}
              className={`p-3 rounded-full transition-all duration-200 ${
                isMuted 
                  ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed' 
                  : 'bg-white/20 text-white hover:bg-white/30 hover:scale-110'
              }`}
              whileHover={!isMuted ? { scale: 1.1 } : {}}
              whileTap={!isMuted ? { scale: 0.95 } : {}}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-black/20 to-black/40">
        <AnimatePresence>
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg ring-2 ring-white/20">
                <Bot size={28} className="text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Welcome to Inookey AI!</h4>
              <p className="text-sm text-white/70 max-w-xs mx-auto leading-relaxed">
                I'm here to help you learn about our services, answer questions, and book consultations. What would you like to know?
              </p>
            </motion.div>
          )}
          
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 400, damping: 25 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-end space-x-3 max-w-sm ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <motion.div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${
                    message.sender === 'user' 
                      ? 'bg-white/20 backdrop-blur-sm ring-2 ring-white/30' 
                      : 'bg-white/10 backdrop-blur-sm ring-2 ring-white/20'
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {message.sender === 'user' ? (
                    <User size={14} className="text-white" />
                  ) : (
                    <Bot size={14} className="text-white" />
                  )}
                </motion.div>
                
                <motion.div 
                  className={`rounded-2xl px-4 py-3 shadow-lg backdrop-blur-sm ${
                    message.sender === 'user'
                      ? 'bg-white/20 border border-white/30 text-white'
                      : 'bg-black/40 border border-white/20 text-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                  <p className={`text-xs mt-2 ${
                    message.sender === 'user' ? 'text-white/70' : 'text-white/60'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex justify-start"
          >
            <div className="flex items-end space-x-3">
              <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm ring-2 ring-white/20 flex items-center justify-center shadow-md">
                <Bot size={14} className="text-white" />
              </div>
              <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 shadow-lg">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <span className="text-xs text-white/60 ml-2">AI is thinking...</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-5 border-t border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                setIsTyping(e.target.value.length > 0);
              }}
              onKeyPress={handleKeyPress}
              placeholder={isListening ? "Listening..." : "Ask me anything about Inookey..."}
              className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-200"
              disabled={isListening}
            />
            {inputText && !isListening && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <button
                  onClick={() => setInputText('')}
                  className="text-white/40 hover:text-white/70 transition-colors"
                >
                  <X size={16} />
                </button>
              </motion.div>
            )}
            {isListening && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1"
              >
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-red-400 font-medium">Recording</span>
              </motion.div>
            )}
          </div>
          
          {/* Voice Controls */}
          <motion.button
            onClick={onToggleListening}
            className={`p-3 rounded-xl transition-all duration-200 shadow-lg backdrop-blur-sm ${
              isListening
                ? 'bg-red-500/80 hover:bg-red-600/80 text-white border border-red-400/50'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={isListening ? "Stop listening" : "Start voice input"}
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </motion.button>
          
          <motion.button
            onClick={onToggleMute}
            className={`p-3 rounded-xl transition-all duration-200 shadow-lg backdrop-blur-sm ${
              isMuted
                ? 'bg-white/5 hover:bg-white/10 text-white/60 border border-white/10'
                : 'bg-green-500/80 hover:bg-green-600/80 text-white border border-green-400/50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={isMuted ? "Unmute voice" : "Mute voice"}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </motion.button>
          
          <motion.button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isListening}
            className={`p-3 rounded-xl transition-all duration-200 shadow-lg backdrop-blur-sm ${
              inputText.trim() && !isListening
                ? 'bg-white/20 hover:bg-white/30 text-white border border-white/30'
                : 'bg-white/5 text-white/40 cursor-not-allowed border border-white/10'
            }`}
            whileHover={inputText.trim() && !isListening ? { scale: 1.05 } : {}}
            whileTap={inputText.trim() && !isListening ? { scale: 0.95 } : {}}
            title="Send message"
          >
            <Send size={18} />
          </motion.button>
        </div>
      </div>

      {/* Portal-rendered dropdown menu */}
      {showSuggestions && createPortal(
        <AnimatePresence>
                            <motion.div
                    data-suggestions-menu
                    className="fixed bg-black/95 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden w-72"
                    style={{
                      top: menuPosition.top,
                      right: menuPosition.right,
                      zIndex: 9999
                    }}
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div className="p-3 bg-white/10 backdrop-blur-sm border-b border-white/10">
              <h4 className="font-semibold text-sm flex items-center gap-2 text-white">
                💡 Suggested Questions
                <ChevronDown size={16} />
              </h4>
            </div>
            
            <div className="max-h-64 overflow-y-auto">
              {[
                { icon: "✨", text: "Tell me about your services", category: "Services" },
                { icon: "📅", text: "Book a consultation", category: "Booking" },
                { icon: "💰", text: "What are your prices?", category: "Pricing" },
                { icon: "⏱️", text: "How long does development take?", category: "Timeline" },
                { icon: "🚀", text: "What makes Inookey special?", category: "About" },
                { icon: "💼", text: "View portfolio examples", category: "Portfolio" },
                { icon: "🔧", text: "What technologies do you use?", category: "Technical" },
                { icon: "📞", text: "How can I contact your team?", category: "Contact" }
              ].map((suggestion, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    onSendMessage(suggestion.text);
                    setShowSuggestions(false);
                  }}
                  className="w-full p-3 text-left hover:bg-white/10 border-b border-white/10 last:border-b-0 transition-all duration-200 group"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg group-hover:scale-110 transition-transform">
                      {suggestion.icon}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white group-hover:text-green-400">
                        {suggestion.text}
                      </p>
                      <p className="text-xs text-white/60 group-hover:text-green-300">
                        {suggestion.category}
                      </p>
                    </div>
                    <ChevronDown size={16} className="text-white/40 group-hover:text-green-400 rotate-[-90deg] group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.button>
              ))}
            </div>
            
            <div className="p-3 bg-white/5 border-t border-white/10">
              <button
                onClick={() => setShowSuggestions(false)}
                className="w-full text-center text-xs text-white/60 hover:text-white transition-colors"
              >
                Close suggestions
              </button>
            </div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </motion.div>
  );
};

export default ChatInterface; 