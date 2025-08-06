# 🤖 Inookey AI Voice Assistant

A comprehensive AI-powered voice assistant for Inookey that can handle customer inquiries, provide service information, and book appointments. Built with open-source technologies for complete privacy and control.

## 🎯 Features

### Core Capabilities
- **Voice Recognition**: Real-time speech-to-text using Web Speech API
- **AI Processing**: Local LLM processing with Ollama
- **Text-to-Speech**: Natural voice responses
- **3D Avatar**: Animated 3D assistant using Three.js
- **Conversation Management**: Persistent chat history
- **Appointment Booking**: Seamless consultation scheduling
- **Knowledge Base**: Comprehensive Inookey service information

### Technical Features
- **100% Open Source**: No proprietary AI services
- **Offline Capable**: Runs completely locally
- **Real-time Communication**: WebSocket-based chat
- **Responsive Design**: Works on all devices
- **Voice Controls**: Mute, listen, chat modes
- **Analytics**: Conversation tracking and insights

## 🏗️ Architecture

```
Frontend (React + TypeScript)
├── Voice Assistant Component
├── 3D Avatar (Three.js)
├── Speech Recognition (Web Speech API)
├── Text-to-Speech (Web Speech API)
└── Chat Interface

Backend (Node.js + Express)
├── AI Processing (Ollama)
├── Conversation Management
├── Appointment Booking
└── Knowledge Base

Open Source Technologies
├── Ollama (Local LLM)
├── Whisper (Speech-to-Text)
├── Coqui TTS (Text-to-Speech)
└── Three.js (Avatar Animation)
```

## 🚀 Quick Start

### Prerequisites

1. **Install Ollama** (for local LLM):
   ```bash
   # macOS
   brew install ollama
   
   # Linux
   curl -fsSL https://ollama.ai/install.sh | sh
   
   # Windows
   # Download from https://ollama.ai/download
   ```

2. **Install Node.js** (v18+):
   ```bash
   # Using nvm
   nvm install 18
   nvm use 18
   ```

3. **Install FFmpeg** (for audio processing):
   ```bash
   # macOS
   brew install ffmpeg
   
   # Ubuntu/Debian
   sudo apt update && sudo apt install ffmpeg
   
   # Windows
   # Download from https://ffmpeg.org/download.html
   ```

### Installation

1. **Clone and setup frontend**:
   ```bash
   cd inookey-landing
   npm install
   ```

2. **Setup backend**:
   ```bash
   cd backend
   npm install
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Download Ollama model**:
   ```bash
   ollama pull llama3.1:8b
   ```

4. **Start Ollama service**:
   ```bash
   ollama serve
   ```

5. **Start the backend**:
   ```bash
   cd backend
   npm run dev
   ```

6. **Start the frontend**:
   ```bash
   cd inookey-landing
   npm start
   ```

## 🔧 Configuration

### Environment Variables

Create `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Ollama Configuration
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=llama3.1:8b

# Database Configuration
DATABASE_PATH=./data/inookey_ai.db

# Security
JWT_SECRET=your-super-secret-jwt-key-here
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Voice Processing
WHISPER_MODEL=base
TTS_VOICE=en-US-Neural2-F

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Analytics
ANALYTICS_ENABLED=true
LOG_LEVEL=info
```

### Ollama Models

The system supports various Ollama models:

- `llama3.1:8b` (recommended for balance of speed/quality)
- `llama3.1:70b` (highest quality, slower)
- `mistral:7b` (fast, good quality)
- `codellama:7b` (good for technical discussions)

## 🎮 Usage

### Voice Assistant Controls

1. **Activate**: Click the floating assistant icon
2. **Listen**: Click the microphone button to start voice recognition
3. **Mute**: Click the volume button to mute/unmute responses
4. **Chat**: Click the message button for text-based chat
5. **Close**: Click the X button to hide the assistant

### Voice Commands

The assistant understands natural language queries about:

- **Services**: "Tell me about your services"
- **Pricing**: "How much do your services cost?"
- **Process**: "What's your development process?"
- **Booking**: "I want to book a consultation"
- **Technology**: "What technologies do you use?"
- **Timeline**: "How long does development take?"

### Chat Interface

- **Quick Actions**: Pre-defined buttons for common queries
- **Conversation History**: Persistent chat across sessions
- **Suggestions**: AI-generated follow-up questions
- **Voice Playback**: Click to hear responses aloud

## 🛠️ Development

### Project Structure

```
inookey-landing/
├── src/
│   ├── components/
│   │   ├── VoiceAssistant.tsx          # Main assistant component
│   │   ├── VoiceAssistantAvatar.tsx    # 3D avatar
│   │   └── ChatInterface.tsx           # Chat UI
│   └── App.tsx                         # Main app with assistant
├── backend/
│   ├── routes/
│   │   ├── chat.js                     # AI chat endpoints
│   │   ├── appointments.js             # Booking endpoints
│   │   └── knowledgeBase.js           # Service info
│   ├── services/
│   │   ├── aiService.js               # AI processing
│   │   ├── ollamaService.js           # LLM integration
│   │   ├── database.js                # Data persistence
│   │   └── websocketService.js        # Real-time communication
│   └── server.js                      # Express server
```

### Adding New Features

1. **New AI Capabilities**:
   - Edit `backend/services/aiService.js`
   - Add new intent patterns in `INTENT_PATTERNS`
   - Update knowledge base in `backend/routes/knowledgeBase.js`

2. **New Voice Commands**:
   - Add patterns to `INTENT_PATTERNS` in `aiService.js`
   - Update response logic in `processMessage` function

3. **New UI Components**:
   - Create components in `src/components/`
   - Import and use in `VoiceAssistant.tsx`

### Customizing the AI

1. **Update Company Context**:
   - Edit `INOOKEY_CONTEXT` in `aiService.js`
   - Add new services, pricing, or process information

2. **Modify Response Style**:
   - Update the system prompt in `ollamaService.js`
   - Adjust temperature and other parameters

3. **Add New Intents**:
   - Extend `INTENT_PATTERNS` object
   - Add corresponding response logic

## 🔒 Security & Privacy

### Data Protection
- **Local Processing**: All AI processing happens locally
- **No External APIs**: No data sent to third-party services
- **Encrypted Storage**: Database encryption for sensitive data
- **Rate Limiting**: Protection against abuse

### Privacy Features
- **Session Management**: Temporary conversation storage
- **Data Retention**: Configurable data retention policies
- **User Consent**: Clear data usage notifications
- **GDPR Compliance**: Right to data deletion

## 📊 Analytics & Monitoring

### Conversation Analytics
- User interaction patterns
- Popular queries and intents
- Response quality metrics
- Appointment booking success rates

### System Monitoring
- Ollama model performance
- Response times and latency
- Error rates and debugging
- Connection health monitoring

## 🚀 Deployment

### Production Setup

1. **Environment Configuration**:
   ```bash
   NODE_ENV=production
   OLLAMA_HOST=http://your-server:11434
   DATABASE_PATH=/var/lib/inookey-ai/database.db
   ```

2. **Process Management**:
   ```bash
   # Using PM2
   npm install -g pm2
   pm2 start backend/server.js --name "inookey-ai"
   pm2 start "ollama serve" --name "ollama"
   ```

3. **Reverse Proxy** (Nginx):
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
       }
       
       location /api {
           proxy_pass http://localhost:5000;
       }
   }
   ```

### Docker Deployment

```dockerfile
# Dockerfile for backend
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
```

## 🐛 Troubleshooting

### Common Issues

1. **Ollama Connection Failed**:
   ```bash
   # Check if Ollama is running
   curl http://localhost:11434/api/tags
   
   # Restart Ollama
   ollama serve
   ```

2. **Speech Recognition Not Working**:
   - Ensure HTTPS in production (required for Web Speech API)
   - Check browser permissions for microphone access
   - Try different browsers (Chrome recommended)

3. **3D Avatar Not Loading**:
   - Check Three.js dependencies
   - Verify WebGL support in browser
   - Check console for errors

4. **Database Errors**:
   ```bash
   # Check database file permissions
   ls -la backend/data/
   
   # Recreate database
   rm backend/data/inookey_ai.db
   npm run dev
   ```

### Performance Optimization

1. **Faster AI Responses**:
   - Use smaller Ollama models (7B instead of 70B)
   - Optimize prompt length
   - Enable response streaming

2. **Better Voice Quality**:
   - Use higher quality TTS models
   - Optimize audio processing
   - Implement voice caching

3. **Reduced Memory Usage**:
   - Limit conversation history
   - Implement conversation cleanup
   - Optimize 3D avatar rendering

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/ai-voice-assistant
   ```
3. **Make your changes**
4. **Test thoroughly**:
   ```bash
   npm test
   npm run lint
   ```
5. **Submit a pull request**

### Code Standards

- **TypeScript**: Use strict typing
- **ESLint**: Follow linting rules
- **Prettier**: Consistent formatting
- **Testing**: Unit tests for new features
- **Documentation**: Update README for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Ollama**: Local LLM inference
- **Three.js**: 3D graphics library
- **React Three Fiber**: React Three.js integration
- **Web Speech API**: Browser speech recognition
- **Express.js**: Backend framework
- **SQLite**: Database storage

## 📞 Support

For questions, issues, or contributions:

- **Issues**: Create GitHub issues
- **Discussions**: Use GitHub discussions
- **Email**: contact@inookey.com

---

**Built with ❤️ by the Inookey Team** 