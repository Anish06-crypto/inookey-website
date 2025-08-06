import { Ollama } from 'ollama';

// Initialize Ollama client
const ollama = new Ollama({
  host: process.env.OLLAMA_HOST || 'http://127.0.0.1:11434'
});

// Inookey-specific knowledge base and context
const INOOKEY_CONTEXT = `
You are Inookey's virtual receptionist - a warm, friendly assistant who welcomes visitors and helps them understand how we can help their business.

ABOUT INOOKEY:
We're a software development company that builds custom applications and AI solutions for businesses.

OUR SERVICES:
1. Custom Software - We build web apps, mobile apps, and custom systems
2. AI Integration - We add smart features using artificial intelligence  
3. Process Automation - We automate tasks to save time and money
4. Consulting - We help plan your technology projects

SIMPLE ANSWERS:
- Projects typically take 2-4 weeks
- We offer free consultations to discuss your needs
- Pricing depends on what you need - we'll give you a quote after our chat
- We work with businesses of all sizes
- Yes, we can work with your existing systems

RESPONSE STYLE:
- Be warm, friendly, and conversational like a receptionist
- Keep responses short and easy to understand
- Don't be overly technical - speak in simple terms
- Always offer to connect them with our team
- Focus on how we can help THEM specifically
- Sound genuinely interested in helping

BOOKING MEETINGS:
When someone wants to schedule:
- Ask for their name, email, and preferred time
- Confirm we'll send them a meeting link
- Let them know we'll discuss their specific needs

Remember: You're the friendly first impression of Inookey. Keep it simple, warm, and helpful.
`;

// Intent classification patterns
const INTENT_PATTERNS = {
  services: [
    'service', 'what do you do', 'offer', 'provide', 'build', 'develop',
    'create', 'make', 'specialize', 'expertise', 'capabilities'
  ],
  pricing: [
    'cost', 'price', 'how much', 'pricing', 'quote', 'budget', 'expensive',
    'cheap', 'affordable', 'investment', 'value'
  ],
  process: [
    'process', 'timeline', 'how long', 'duration', 'steps', 'workflow',
    'methodology', 'approach', 'delivery', '30 days'
  ],
  booking: [
    'book', 'schedule', 'appointment', 'consultation', 'meeting', 'call',
    'contact', 'reach out', 'get started', 'begin', 'start project'
  ],
  technology: [
    'technology', 'tech stack', 'framework', 'language', 'platform',
    'tools', 'libraries', 'AI', 'machine learning', 'automation'
  ],
  support: [
    'support', 'maintenance', 'help', 'assist', 'ongoing', 'after launch',
    'updates', 'bug fixes', 'improvements'
  ]
};

// Function to classify user intent
function classifyIntent(message) {
  const lowerMessage = message.toLowerCase();
  let maxScore = 0;
  let detectedIntent = 'general';

  for (const [intent, patterns] of Object.entries(INTENT_PATTERNS)) {
    const score = patterns.reduce((total, pattern) => {
      return total + (lowerMessage.includes(pattern) ? 1 : 0);
    }, 0);
    
    if (score > maxScore) {
      maxScore = score;
      detectedIntent = intent;
    }
  }

  return {
    intent: detectedIntent,
    confidence: maxScore / Math.max(...Object.values(INTENT_PATTERNS).map(p => p.length))
  };
}

// Function to generate contextual suggestions
function generateSuggestions(intent, message) {
  const suggestions = {
    services: [
      "Tell me more about your AI integration services",
      "What kind of applications do you build?",
      "Can you explain your development process?"
    ],
    pricing: [
      "Can you provide a rough estimate?",
      "What factors affect pricing?",
      "Do you offer different pricing tiers?"
    ],
    process: [
      "How do you ensure quality in 30 days?",
      "What happens after the 30-day delivery?",
      "Can you explain your development phases?"
    ],
    booking: [
      "What information do you need for a consultation?",
      "How long does the initial consultation take?",
      "What should I prepare for the meeting?"
    ],
    technology: [
      "What AI technologies do you use?",
      "Can you work with our existing tech stack?",
      "How do you handle data security?"
    ],
    support: [
      "What's included in ongoing support?",
      "How do you handle updates and maintenance?",
      "What's your response time for issues?"
    ]
  };

  return suggestions[intent] || [
    "Tell me about your services",
    "What are your development timelines?",
    "How much do your services cost?",
    "Book a consultation call"
  ];
}

// Main AI processing function
async function processMessage(message, conversationHistory = []) {
  try {
    // Classify user intent
    const intentAnalysis = classifyIntent(message);
    
    // Build conversation context
    const conversationContext = conversationHistory
      .slice(-5) // Last 5 messages for context
      .map(msg => `${msg.sender}: ${msg.text}`)
      .join('\n');

    // Create the prompt for Ollama
    const prompt = `${INOOKEY_CONTEXT}

CONVERSATION HISTORY:
${conversationContext}

USER MESSAGE: ${message}

Please provide a helpful, informative response as Inookey AI. Be specific about our services, process, and capabilities. If the user wants to book a consultation, encourage them to do so and mention we can help them get started.

RESPONSE:`;

    // Get response from Ollama
    const response = await ollama.chat({
      model: process.env.OLLAMA_MODEL || 'llama3.1:8b',
      messages: [
        {
          role: 'system',
          content: INOOKEY_CONTEXT
        },
        ...conversationHistory.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        })),
        {
          role: 'user',
          content: message
        }
      ],
      options: {
        temperature: 0.7,
        top_p: 0.9,
        max_tokens: 500
      }
    });

    const aiResponse = response.message.content.trim();

    // Generate suggestions based on intent
    const suggestions = generateSuggestions(intentAnalysis.intent, message);

    return {
      response: aiResponse,
      intent: intentAnalysis.intent,
      confidence: intentAnalysis.confidence,
      suggestions
    };

  } catch (error) {
    console.error('❌ AI processing error:', error);
    
    // Fallback response if AI service fails
    return {
      response: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment, or feel free to contact us directly for immediate assistance. You can also book a consultation call and I'll be happy to help you get started with your project!",
      intent: 'general',
      confidence: 0.5,
      suggestions: [
        "Book a consultation call",
        "Tell me about your services",
        "What are your development timelines?"
      ]
    };
  }
}

// Function to handle appointment booking requests
async function handleAppointmentRequest(message) {
  const bookingKeywords = [
    'book', 'schedule', 'appointment', 'consultation', 'meeting', 'call',
    'get started', 'begin project', 'start working'
  ];

  const hasBookingIntent = bookingKeywords.some(keyword => 
    message.toLowerCase().includes(keyword)
  );

  if (hasBookingIntent) {
    return {
      response: "Great! I'd be happy to help you book a consultation. Our team will discuss your project requirements, timeline, and budget to create a custom solution for you. You can schedule a call through our calendar, or I can help you get started right away. What's the best way to reach you?",
      intent: 'booking',
      confidence: 0.9,
      suggestions: [
        "Schedule a consultation call",
        "Tell me about your process",
        "What information do you need?"
      ]
    };
  }

  return null;
}

export {
  processMessage,
  classifyIntent,
  generateSuggestions,
  handleAppointmentRequest
}; 