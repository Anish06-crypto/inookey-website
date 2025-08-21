import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';

interface FormattedResponseProps {
  content: string;
  isTyping?: boolean;
}

const FormattedResponse: React.FC<FormattedResponseProps> = ({ content, isTyping = false }) => {
  // Clean and format the content for better readability
  const formatContent = (text: string) => {
    // Remove excessive line breaks and clean up spacing
    let formatted = text
      .replace(/\n{3,}/g, '\n\n') // Max 2 line breaks
      .replace(/\s+/g, ' ') // Normalize spaces
      .trim();

    // Add structure for common patterns
    formatted = formatted
      // Make service lists more readable
      .replace(/(\d+\.\s*[^.]+)(?=\s*\d+\.)/g, '$1\n\n')
      // Add emphasis to key phrases
      .replace(/(Our services?|We offer|What we do|Key features?|Benefits?)(:?)/gi, '**$1**$2')
      // Format pricing mentions
      .replace(/(pricing|cost|price|budget|investment)(\s+depends?\s+on)/gi, '**$1**$2')
      // Format timeline mentions
      .replace(/(\d+[-–]\d+\s*(?:days?|weeks?|months?))/gi, '**$1**')
      // Add structure to process descriptions
      .replace(/(first|second|third|next|then|finally)(\s*[,:]\s*)/gi, '\n\n**$1**$2 ');

    return formatted;
  };

  const formattedContent = formatContent(content);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="formatted-response"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom components for different markdown elements
          p: ({ children }) => (
            <p className="mb-3 leading-relaxed text-sm text-white">{children}</p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-green-400">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-blue-300">{children}</em>
          ),
          ul: ({ children }) => (
            <ul className="mb-3 ml-4 space-y-1 list-disc list-inside">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-3 ml-4 space-y-1 list-decimal list-inside">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-sm text-white/90 leading-relaxed">{children}</li>
          ),
          h1: ({ children }) => (
            <h1 className="mb-3 text-lg font-bold text-green-400">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="mb-2 text-base font-semibold text-blue-300">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-2 text-sm font-medium text-white">{children}</h3>
          ),
          blockquote: ({ children }) => (
            <blockquote className="pl-3 mb-3 border-l-2 border-green-400/50 text-white/80 italic">
              {children}
            </blockquote>
          ),
          code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="px-1 py-0.5 text-xs bg-white/10 text-green-300 rounded">
                  {children}
                </code>
              );
            }
            return (
              <pre className="p-3 mb-3 bg-black/30 text-green-300 text-xs rounded-lg overflow-x-auto">
                <code className={className}>{children}</code>
              </pre>
            );
          },
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline transition-colors"
            >
              {children}
            </a>
          ),
        }}
      >
        {formattedContent}
      </ReactMarkdown>
      
      {/* Typing indicator */}
      {isTyping && (
        <motion.div
          className="flex items-center gap-1 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex space-x-1">
            <motion.div
              className="w-1 h-1 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
            />
            <motion.div
              className="w-1 h-1 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className="w-1 h-1 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
            />
          </div>
          <span className="text-xs text-white/60 ml-2">Thinking...</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FormattedResponse;
