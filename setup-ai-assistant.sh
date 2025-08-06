#!/bin/bash

# Inookey AI Voice Assistant Setup Script
# This script automates the installation and configuration of the AI voice assistant

set -e

echo "🤖 Inookey AI Voice Assistant Setup"
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running on supported OS
check_os() {
    print_status "Checking operating system..."
    
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        OS="linux"
        print_success "Linux detected"
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        OS="macos"
        print_success "macOS detected"
    elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
        OS="windows"
        print_warning "Windows detected - some features may require manual setup"
    else
        print_error "Unsupported operating system: $OSTYPE"
        exit 1
    fi
}

# Check Node.js installation
check_node() {
    print_status "Checking Node.js installation..."
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed"
        print_status "Please install Node.js v18+ from https://nodejs.org/"
        exit 1
    fi
    
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18+ is required. Current version: $(node --version)"
        exit 1
    fi
    
    print_success "Node.js $(node --version) is installed"
}

# Check npm installation
check_npm() {
    print_status "Checking npm installation..."
    
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed"
        exit 1
    fi
    
    print_success "npm $(npm --version) is installed"
}

# Install Ollama
install_ollama() {
    print_status "Installing Ollama..."
    
    if command -v ollama &> /dev/null; then
        print_success "Ollama is already installed"
        return
    fi
    
    if [ "$OS" == "macos" ]; then
        if command -v brew &> /dev/null; then
            brew install ollama
        else
            print_error "Homebrew is required for macOS installation"
            print_status "Install Homebrew: https://brew.sh/"
            exit 1
        fi
    elif [ "$OS" == "linux" ]; then
        curl -fsSL https://ollama.ai/install.sh | sh
    else
        print_warning "Please install Ollama manually from https://ollama.ai/download"
        return
    fi
    
    print_success "Ollama installed successfully"
}

# Install FFmpeg
install_ffmpeg() {
    print_status "Installing FFmpeg..."
    
    if command -v ffmpeg &> /dev/null; then
        print_success "FFmpeg is already installed"
        return
    fi
    
    if [ "$OS" == "macos" ]; then
        if command -v brew &> /dev/null; then
            brew install ffmpeg
        else
            print_error "Homebrew is required for macOS installation"
            exit 1
        fi
    elif [ "$OS" == "linux" ]; then
        if command -v apt-get &> /dev/null; then
            sudo apt-get update && sudo apt-get install -y ffmpeg
        elif command -v yum &> /dev/null; then
            sudo yum install -y ffmpeg
        else
            print_warning "Please install FFmpeg manually from https://ffmpeg.org/download.html"
            return
        fi
    else
        print_warning "Please install FFmpeg manually from https://ffmpeg.org/download.html"
        return
    fi
    
    print_success "FFmpeg installed successfully"
}

# Setup frontend dependencies
setup_frontend() {
    print_status "Setting up frontend dependencies..."
    
    cd inookey-landing
    
    if [ ! -f "package.json" ]; then
        print_error "package.json not found in inookey-landing directory"
        exit 1
    fi
    
    npm install
    
    print_success "Frontend dependencies installed"
}

# Setup backend dependencies
setup_backend() {
    print_status "Setting up backend dependencies..."
    
    cd backend
    
    if [ ! -f "package.json" ]; then
        print_error "package.json not found in backend directory"
        exit 1
    fi
    
    npm install
    
    # Create .env file if it doesn't exist
    if [ ! -f ".env" ]; then
        print_status "Creating .env file..."
        cp env.example .env
        print_success ".env file created - please edit with your configuration"
    else
        print_success ".env file already exists"
    fi
    
    print_success "Backend dependencies installed"
}

# Download Ollama model
download_ollama_model() {
    print_status "Downloading Ollama model (llama3.1:8b)..."
    
    if ! command -v ollama &> /dev/null; then
        print_warning "Ollama not found - skipping model download"
        return
    fi
    
    # Check if model is already downloaded
    if ollama list | grep -q "llama3.1:8b"; then
        print_success "Model llama3.1:8b is already downloaded"
        return
    fi
    
    print_status "This may take several minutes depending on your internet connection..."
    ollama pull llama3.1:8b
    
    print_success "Ollama model downloaded successfully"
}

# Create startup scripts
create_startup_scripts() {
    print_status "Creating startup scripts..."
    
    # Create start-ollama.sh
    cat > start-ollama.sh << 'EOF'
#!/bin/bash
echo "🚀 Starting Ollama service..."
ollama serve
EOF
    
    # Create start-backend.sh
    cat > start-backend.sh << 'EOF'
#!/bin/bash
echo "🚀 Starting Inookey AI Backend..."
cd backend
npm run dev
EOF
    
    # Create start-frontend.sh
    cat > start-frontend.sh << 'EOF'
#!/bin/bash
echo "🚀 Starting Inookey AI Frontend..."
cd inookey-landing
npm start
EOF
    
    # Create start-all.sh
    cat > start-all.sh << 'EOF'
#!/bin/bash
echo "🚀 Starting Inookey AI Voice Assistant..."

# Start Ollama in background
echo "Starting Ollama..."
ollama serve &
OLLAMA_PID=$!

# Wait for Ollama to start
sleep 5

# Start backend in background
echo "Starting Backend..."
cd backend
npm run dev &
BACKEND_PID=$!

# Wait for backend to start
sleep 10

# Start frontend
echo "Starting Frontend..."
cd ../inookey-landing
npm start &
FRONTEND_PID=$!

echo "✅ All services started!"
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:5000"
echo "Ollama: http://localhost:11434"

# Wait for user to stop
echo "Press Ctrl+C to stop all services"
wait

# Cleanup
echo "🛑 Stopping all services..."
kill $OLLAMA_PID $BACKEND_PID $FRONTEND_PID 2>/dev/null
EOF
    
    # Make scripts executable
    chmod +x start-ollama.sh start-backend.sh start-frontend.sh start-all.sh
    
    print_success "Startup scripts created"
}

# Display next steps
show_next_steps() {
    echo ""
    echo "🎉 Setup completed successfully!"
    echo "================================"
    echo ""
    echo "Next steps:"
    echo ""
    echo "1. Configure environment variables:"
    echo "   - Edit backend/.env with your settings"
    echo ""
    echo "2. Start the services:"
    echo "   - Run: ./start-all.sh"
    echo "   - Or start individually:"
    echo "     - ./start-ollama.sh"
    echo "     - ./start-backend.sh"
    echo "     - ./start-frontend.sh"
    echo ""
    echo "3. Access the application:"
    echo "   - Frontend: http://localhost:3000"
    echo "   - Backend API: http://localhost:5000"
    echo "   - Ollama: http://localhost:11434"
    echo ""
    echo "4. Test the voice assistant:"
    echo "   - Click the floating assistant icon"
    echo "   - Try voice commands like 'Tell me about your services'"
    echo ""
    echo "For more information, see README-AI-ASSISTANT.md"
    echo ""
}

# Main setup function
main() {
    echo "Starting Inookey AI Voice Assistant setup..."
    echo ""
    
    check_os
    check_node
    check_npm
    install_ollama
    install_ffmpeg
    setup_frontend
    setup_backend
    download_ollama_model
    create_startup_scripts
    show_next_steps
}

# Run main function
main "$@" 