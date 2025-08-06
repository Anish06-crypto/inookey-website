# 🚀 Inookey AI Assistant - Minimal Deployment Guide

## 🎯 Target: $0-6/month Professional Launch

### **📋 Tech Stack**
- **Frontend**: Vercel (Free) + Custom Domain
- **Backend**: Railway (Free 500h/month) 
- **Database**: SQLite (included with backend)
- **AI**: Ollama on Railway + Browser TTS fallback
- **Monitoring**: Free tier tools

---

## **Step 1: Frontend Deployment (Vercel) - FREE**

### **1.1 GitHub Setup**
```bash
# If not done yet - create GitHub repo and push
git remote add origin https://github.com/YOUR_USERNAME/inookey-ai-assistant.git
git push -u origin complete-ai-assistant
```

### **1.2 Vercel Deployment**
1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click "New Project" → Import your GitHub repository
3. Select `complete-ai-assistant` branch
4. Set build settings:
   - **Framework**: Create React App
   - **Root Directory**: `inookey-landing`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### **1.3 Environment Variables in Vercel**
Add these in Vercel Dashboard → Project → Settings → Environment Variables:
```
REACT_APP_API_URL=https://your-backend-url.up.railway.app
REACT_APP_WS_URL=wss://your-backend-url.up.railway.app  
REACT_APP_ENVIRONMENT=production
REACT_APP_SPLINE_SCENE_URL=https://prod.spline.design/YDfflhUHczfhClIJ/scene.splinecode
REACT_APP_VOICE_ASSISTANT_ENABLED=true
REACT_APP_TTS_ENABLED=true
```

### **1.4 Custom Domain**
1. In Vercel Dashboard → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

---

## **Step 2: Backend Deployment (Railway) - FREE**

### **2.1 Railway Setup**
1. Go to [railway.app](https://railway.app) and sign up with GitHub
2. Create new project → Deploy from GitHub repo
3. Select your repository
4. Choose `backend` folder as root directory

### **2.2 Environment Variables in Railway**
Add these in Railway Dashboard → Variables:
```
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-vercel-app.vercel.app
DATABASE_PATH=./data/inookey_ai.db
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=llama3.1:8b
JWT_SECRET=your-super-secret-jwt-key-change-this
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
CORS_ORIGIN=https://your-vercel-app.vercel.app
```

### **2.3 Ollama Service (Optional - for full AI)**
1. In Railway, add new service → Empty Service
2. Add Ollama Docker deployment:
   ```dockerfile
   FROM ollama/ollama:latest
   EXPOSE 11434
   CMD ["ollama", "serve"]
   ```

---

## **Step 3: Configuration Updates**

### **3.1 Update Vercel Environment**
After Railway deployment, update Vercel environment variables with actual Railway URL:
```
REACT_APP_API_URL=https://your-actual-railway-url.up.railway.app
REACT_APP_WS_URL=wss://your-actual-railway-url.up.railway.app
```

### **3.2 Update Railway Environment**
Update Railway with actual Vercel URL:
```
FRONTEND_URL=https://your-actual-vercel-app.vercel.app
CORS_ORIGIN=https://your-actual-vercel-app.vercel.app
```

---

## **Step 4: Testing & Monitoring**

### **4.1 Health Checks**
- Frontend: `https://your-domain.com`
- Backend: `https://your-railway-url.up.railway.app/health`

### **4.2 Free Monitoring Setup**
1. **UptimeRobot**: Free uptime monitoring
2. **Vercel Analytics**: Built-in performance monitoring
3. **Railway Logs**: Built-in logging and metrics

---

## **💰 Cost Breakdown**
- **Vercel**: $0 (Free tier)
- **Railway**: $0 (500h/month free)
- **Domain**: Your existing domain
- **Total**: $0-6/month (depending on usage)

---

## **🔄 Deployment Commands**

### **Deploy Frontend Updates**
```bash
git add .
git commit -m "Frontend updates"
git push origin complete-ai-assistant
# Vercel auto-deploys from GitHub
```

### **Deploy Backend Updates**
```bash
# Railway auto-deploys from GitHub when backend/ folder changes
git add backend/
git commit -m "Backend updates"
git push origin complete-ai-assistant
```

---

## **🚀 Go Live Checklist**

- [ ] GitHub repository created and pushed
- [ ] Vercel project deployed with environment variables
- [ ] Railway backend deployed with environment variables  
- [ ] Custom domain configured and working
- [ ] Frontend can reach backend API
- [ ] Voice assistant functionality tested
- [ ] Health checks passing
- [ ] Monitoring configured

**Your professional AI assistant website is now live! 🎉**
