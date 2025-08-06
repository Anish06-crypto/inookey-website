@echo off
echo 🤖 Inookey AI Voice Assistant Setup
echo ==================================
echo.

echo [INFO] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed
    echo Please install Node.js v18+ from https://nodejs.org/
    pause
    exit /b 1
)
echo [SUCCESS] Node.js is installed

echo [INFO] Checking npm installation...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed
    pause
    exit /b 1
)
echo [SUCCESS] npm is installed

echo [INFO] Setting up frontend dependencies...
if not exist "package.json" (
    echo [ERROR] package.json not found in current directory
    pause
    exit /b 1
)

call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install frontend dependencies
    pause
    exit /b 1
)
echo [SUCCESS] Frontend dependencies installed

echo [INFO] Setting up backend dependencies...
if not exist "backend\package.json" (
    echo [ERROR] package.json not found in backend directory
    pause
    exit /b 1
)

cd backend
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install backend dependencies
    pause
    exit /b 1
)
echo [SUCCESS] Backend dependencies installed

echo [INFO] Creating .env file...
cd ..
if not exist "backend\.env" (
    echo # Server Configuration > backend\.env
    echo PORT=5000 >> backend\.env
    echo NODE_ENV=development >> backend\.env
    echo FRONTEND_URL=http://localhost:3000 >> backend\.env
    echo. >> backend\.env
    echo # Ollama Configuration >> backend\.env
    echo OLLAMA_HOST=http://localhost:11434 >> backend\.env
    echo OLLAMA_MODEL=llama3.1:8b >> backend\.env
    echo. >> backend\.env
    echo # Database Configuration >> backend\.env
    echo DATABASE_PATH=./data/inookey_ai.db >> backend\.env
    echo. >> backend\.env
    echo # Security >> backend\.env
    echo JWT_SECRET=your-super-secret-jwt-key-here >> backend\.env
    echo RATE_LIMIT_WINDOW_MS=900000 >> backend\.env
    echo RATE_LIMIT_MAX_REQUESTS=100 >> backend\.env
    echo. >> backend\.env
    echo # Voice Processing >> backend\.env
    echo WHISPER_MODEL=base >> backend\.env
    echo TTS_VOICE=en-US-Neural2-F >> backend\.env
    echo. >> backend\.env
    echo # Email Configuration >> backend\.env
    echo SMTP_HOST=smtp.gmail.com >> backend\.env
    echo SMTP_PORT=587 >> backend\.env
    echo SMTP_USER=your-email@gmail.com >> backend\.env
    echo SMTP_PASS=your-app-password >> backend\.env
    echo. >> backend\.env
    echo # Analytics >> backend\.env
    echo ANALYTICS_ENABLED=true >> backend\.env
    echo LOG_LEVEL=info >> backend\.env
    echo. >> backend\.env
    echo # Development >> backend\.env
    echo DEBUG=true >> backend\.env
    echo CORS_ORIGIN=http://localhost:3000 >> backend\.env
    echo [SUCCESS] .env file created
) else (
    echo [SUCCESS] .env file already exists
)

echo [INFO] Creating startup scripts...

echo @echo off > start-ollama.bat
echo echo 🚀 Starting Ollama service... >> start-ollama.bat
echo ollama serve >> start-ollama.bat

echo @echo off > start-backend.bat
echo echo 🚀 Starting Inookey AI Backend... >> start-backend.bat
echo cd backend >> start-backend.bat
echo npm start >> start-backend.bat

echo @echo off > start-frontend.bat
echo echo 🚀 Starting Inookey AI Frontend... >> start-frontend.bat
echo npm start >> start-frontend.bat

echo @echo off > start-all.bat
echo echo 🚀 Starting Inookey AI Voice Assistant... >> start-all.bat
echo. >> start-all.bat
echo echo Starting Ollama... >> start-all.bat
echo start "Ollama" ollama serve >> start-all.bat
echo timeout /t 5 /nobreak ^>nul >> start-all.bat
echo. >> start-all.bat
echo echo Starting Backend... >> start-all.bat
echo cd backend >> start-all.bat
echo start "Backend" npm start >> start-all.bat
echo timeout /t 10 /nobreak ^>nul >> start-all.bat
echo. >> start-all.bat
echo echo Starting Frontend... >> start-all.bat
echo start "Frontend" npm start >> start-all.bat
echo. >> start-all.bat
echo echo ✅ All services started! >> start-all.bat
echo echo Frontend: http://localhost:3000 >> start-all.bat
echo echo Backend: http://localhost:5000 >> start-all.bat
echo echo Ollama: http://localhost:11434 >> start-all.bat
echo. >> start-all.bat
echo echo Press any key to stop all services... >> start-all.bat
echo pause ^>nul >> start-all.bat
echo taskkill /f /im ollama.exe 2^>nul >> start-all.bat
echo taskkill /f /im node.exe 2^>nul >> start-all.bat

echo [SUCCESS] Startup scripts created

echo.
echo 🎉 Setup completed successfully!
echo ================================
echo.
echo Next steps:
echo.
echo 1. Install Ollama manually:
echo    - Download from https://ollama.ai/download
echo    - Install and run: ollama serve
echo.
echo 2. Install FFmpeg manually:
echo    - Download from https://ffmpeg.org/download.html
echo    - Add to PATH environment variable
echo.
echo 3. Configure environment variables:
echo    - Edit backend\.env with your settings
echo.
echo 4. Start the services:
echo    - Run: start-all.bat
echo    - Or start individually:
echo      - start-ollama.bat
echo      - start-backend.bat
echo      - start-frontend.bat
echo.
echo 5. Access the application:
echo    - Frontend: http://localhost:3000
echo    - Backend API: http://localhost:5000
echo    - Ollama: http://localhost:11434
echo.
echo 6. Test the voice assistant:
echo    - Click the floating assistant icon
echo    - Try voice commands like 'Tell me about your services'
echo.
echo For more information, see README-AI-ASSISTANT.md
echo.
pause 