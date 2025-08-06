import { Ollama } from 'ollama';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let ollama;
let isInitialized = false;

// Initialize Ollama service
async function initializeOllama() {
  try {
    const host = process.env.OLLAMA_HOST || 'http://127.0.0.1:11434';
    ollama = new Ollama({ host });
    
    // Test connection
    await ollama.list();
    console.log('✅ Ollama connection established');
    
    // Check if required model is available
    const modelName = process.env.OLLAMA_MODEL || 'llama3.1:8b';
    await ensureModelAvailable(modelName);
    
    isInitialized = true;
    console.log(`✅ Ollama model '${modelName}' is ready`);
    
  } catch (error) {
    console.error('❌ Ollama initialization error:', error);
    throw new Error(`Failed to initialize Ollama: ${error.message}`);
  }
}

// Ensure the required model is available
async function ensureModelAvailable(modelName) {
  try {
    const models = await ollama.list();
    const modelExists = models.models.some(model => 
      model.name === modelName || model.name.includes(modelName.split(':')[0])
    );
    
    if (!modelExists) {
      console.log(`📥 Downloading model '${modelName}'...`);
      await ollama.pull({ model: modelName });
      console.log(`✅ Model '${modelName}' downloaded successfully`);
    } else {
      console.log(`✅ Model '${modelName}' is already available`);
    }
    
  } catch (error) {
    console.error(`❌ Error ensuring model availability:`, error);
    throw new Error(`Failed to ensure model availability: ${error.message}`);
  }
}

// Generate response using Ollama
async function generateResponse(prompt, options = {}) {
  if (!isInitialized) {
    throw new Error('Ollama service not initialized');
  }
  
  try {
    const modelName = process.env.OLLAMA_MODEL || 'llama3.1:8b';
    const response = await ollama.chat({
      model: modelName,
      messages: [
        {
          role: 'system',
          content: 'You are Inookey AI, a helpful assistant for a software development company.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      options: {
        temperature: options.temperature || 0.7,
        top_p: options.top_p || 0.9,
        max_tokens: options.max_tokens || 500,
        ...options
      }
    });
    
    return response.message.content;
    
  } catch (error) {
    console.error('❌ Ollama generation error:', error);
    throw new Error(`Failed to generate response: ${error.message}`);
  }
}

// Generate response with conversation context
async function generateResponseWithContext(messages, options = {}) {
  if (!isInitialized) {
    throw new Error('Ollama service not initialized');
  }
  
  try {
    const modelName = process.env.OLLAMA_MODEL || 'llama3.1:8b';
    const response = await ollama.chat({
      model: modelName,
      messages: messages,
      options: {
        temperature: options.temperature || 0.7,
        top_p: options.top_p || 0.9,
        max_tokens: options.max_tokens || 500,
        ...options
      }
    });
    
    return response.message.content;
    
  } catch (error) {
    console.error('❌ Ollama context generation error:', error);
    throw new Error(`Failed to generate response with context: ${error.message}`);
  }
}

// Stream response for real-time chat
async function streamResponse(prompt, onChunk, options = {}) {
  if (!isInitialized) {
    throw new Error('Ollama service not initialized');
  }
  
  try {
    const modelName = process.env.OLLAMA_MODEL || 'llama3.1:8b';
    const stream = await ollama.chat({
      model: modelName,
      messages: [
        {
          role: 'system',
          content: 'You are Inookey AI, a helpful assistant for a software development company.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      options: {
        temperature: options.temperature || 0.7,
        top_p: options.top_p || 0.9,
        max_tokens: options.max_tokens || 500,
        ...options
      },
      stream: true
    });
    
    let fullResponse = '';
    for await (const chunk of stream) {
      const content = chunk.message?.content || '';
      fullResponse += content;
      onChunk(content);
    }
    
    return fullResponse;
    
  } catch (error) {
    console.error('❌ Ollama streaming error:', error);
    throw new Error(`Failed to stream response: ${error.message}`);
  }
}

// Get available models
async function getAvailableModels() {
  if (!isInitialized) {
    throw new Error('Ollama service not initialized');
  }
  
  try {
    const models = await ollama.list();
    return models.models;
    
  } catch (error) {
    console.error('❌ Error getting available models:', error);
    throw new Error(`Failed to get available models: ${error.message}`);
  }
}

// Get model information
async function getModelInfo(modelName) {
  if (!isInitialized) {
    throw new Error('Ollama service not initialized');
  }
  
  try {
    const info = await ollama.show({ model: modelName });
    return info;
    
  } catch (error) {
    console.error('❌ Error getting model info:', error);
    throw new Error(`Failed to get model info: ${error.message}`);
  }
}

// Health check
async function healthCheck() {
  try {
    if (!isInitialized) {
      return { status: 'not_initialized', error: 'Ollama service not initialized' };
    }
    
    await ollama.list();
    return { status: 'healthy', timestamp: new Date().toISOString() };
    
  } catch (error) {
    return { 
      status: 'unhealthy', 
      error: error.message, 
      timestamp: new Date().toISOString() 
    };
  }
}

// Performance test
async function performanceTest() {
  if (!isInitialized) {
    throw new Error('Ollama service not initialized');
  }
  
  try {
    const startTime = Date.now();
    const testPrompt = "Hello, can you tell me about your services?";
    
    const response = await generateResponse(testPrompt, {
      max_tokens: 100,
      temperature: 0.5
    });
    
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    return {
      responseTime,
      responseLength: response.length,
      tokensPerSecond: response.length / (responseTime / 1000)
    };
    
  } catch (error) {
    console.error('❌ Performance test error:', error);
    throw new Error(`Performance test failed: ${error.message}`);
  }
}

// Create custom model with Inookey context
async function createInookeyModel() {
  if (!isInitialized) {
    throw new Error('Ollama service not initialized');
  }
  
  try {
    const baseModel = process.env.OLLAMA_MODEL || 'llama3.1:8b';
    const customModelName = 'inookey-ai:latest';
    
    // Create Modelfile with Inookey context
    const modelfile = `
FROM ${baseModel}

SYSTEM """You are Inookey AI, a helpful and knowledgeable assistant for Inookey - a software development company that specializes in building intelligent systems and AI-powered applications.

COMPANY INFORMATION:
- Inookey builds thinking systems and intelligent software
- We deliver projects in 30 days
- We specialize in AI integration, workflow automation, and scalable applications
- Our team understands both technology and business needs
- We focus on seamless, scalable AI tools

SERVICES:
1. Custom Software Development
2. AI Integration
3. Process Automation
4. Consulting & Strategy

RESPONSE STYLE:
- Be helpful, professional, and enthusiastic
- Provide specific, actionable information
- Ask clarifying questions when needed
- Offer to book consultations when appropriate
- Keep responses concise but informative
- Use a friendly, approachable tone"""

PARAMETER temperature 0.7
PARAMETER top_p 0.9
PARAMETER max_tokens 500
`;

    // Create temporary Modelfile
    const modelfilePath = path.join(__dirname, '../temp/Modelfile');
    const tempDir = path.dirname(modelfilePath);
    
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    
    fs.writeFileSync(modelfilePath, modelfile);
    
    // Create the model
    console.log('🔧 Creating custom Inookey AI model...');
    await ollama.create({
      model: customModelName,
      modelfile: modelfilePath
    });
    
    // Clean up
    fs.unlinkSync(modelfilePath);
    
    console.log('✅ Custom Inookey AI model created successfully');
    return customModelName;
    
  } catch (error) {
    console.error('❌ Error creating custom model:', error);
    throw new Error(`Failed to create custom model: ${error.message}`);
  }
}

export {
  initializeOllama,
  generateResponse,
  generateResponseWithContext,
  streamResponse,
  getAvailableModels,
  getModelInfo,
  healthCheck,
  performanceTest,
  createInookeyModel
};

export const getInitializationStatus = () => isInitialized; 