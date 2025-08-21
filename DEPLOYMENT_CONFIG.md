# Deployment Configuration Guide

This guide explains how to control which features are enabled for different environments.

## Feature Flags

The app uses feature flags to control what's enabled in different environments. These are controlled via environment variables.

## Environment Variables

### For Development (AI Chat Enabled)
Create a `.env.development` file:
```bash
# Enable AI chat for local development
REACT_APP_ENABLE_AI_CHAT=true
REACT_APP_ENABLE_VOICE_FEATURES=false
REACT_APP_ENABLE_ANALYTICS=false
REACT_APP_API_URL=http://localhost:5000
```

### For Production (AI Chat Disabled)
Create a `.env.production` file:
```bash
# Disable AI chat for production deployment
REACT_APP_ENABLE_AI_CHAT=false
REACT_APP_ENABLE_VOICE_FEATURES=false
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_API_URL=https://your-api-domain.com
```

### For Staging (AI Chat Enabled for Testing)
Create a `.env.staging` file:
```bash
# Enable AI chat for staging testing
REACT_APP_ENABLE_AI_CHAT=true
REACT_APP_ENABLE_VOICE_FEATURES=false
REACT_APP_ENABLE_ANALYTICS=false
REACT_APP_API_URL=https://staging-api.your-domain.com
```

## Deployment Commands

### Build for Production (No AI Chat)
```bash
# This will use .env.production and disable AI chat
npm run build
```

### Build for Staging (With AI Chat)
```bash
# First set the environment
NODE_ENV=staging npm run build
```

### Override Feature Flags
You can also override individual features:
```bash
# Build production with AI chat enabled (for testing)
REACT_APP_ENABLE_AI_CHAT=true npm run build

# Build with all features disabled
REACT_APP_ENABLE_AI_CHAT=false REACT_APP_ENABLE_VOICE_FEATURES=false npm run build
```

## Current Feature States

| Feature | Development | Production | Staging |
|---------|------------|------------|---------|
| AI Chat | ✅ Enabled | ❌ Disabled | ✅ Enabled |
| Voice Features | ❌ Disabled | ❌ Disabled | ❌ Disabled |
| Analytics | ❌ Disabled | ✅ Enabled | ❌ Disabled |

## Quick Commands

```bash
# Development with AI chat
npm start

# Production build without AI chat
npm run build

# Check what features are enabled
# Look for "🚀 Feature Flags:" in the browser console
```

## Code Changes Not Required

- ✅ All AI chat code remains in the codebase
- ✅ No files need to be deleted
- ✅ Easy to re-enable for future releases
- ✅ Feature flags control everything

## Re-enabling AI Chat Later

When you want to deploy with AI chat:

1. Set `REACT_APP_ENABLE_AI_CHAT=true` in your production environment
2. Rebuild: `npm run build`
3. Deploy the new build

No code changes required!
