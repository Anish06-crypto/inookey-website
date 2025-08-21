// Feature flags for controlling what's enabled in different environments

export interface FeatureFlags {
  aiChat: boolean;
  voiceFeatures: boolean;
  analytics: boolean;
  // Add more features as needed
}

// Default feature flags
const defaultFeatures: FeatureFlags = {
  aiChat: false,           // Disabled by default for production
  voiceFeatures: false,    // Voice features disabled
  analytics: true,         // Analytics can stay enabled
};

// Development feature flags (when running locally)
const developmentFeatures: FeatureFlags = {
  aiChat: true,            // Enable AI chat in development
  voiceFeatures: false,    // Keep voice disabled for now
  analytics: false,        // Disable analytics in dev
};

// Get feature flags based on environment
export const getFeatureFlags = (): FeatureFlags => {
  // Check if we're in development mode
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // Check for explicit feature flag overrides from environment variables
  const envOverrides: Partial<FeatureFlags> = {};
  
  if (process.env.REACT_APP_ENABLE_AI_CHAT !== undefined) {
    envOverrides.aiChat = process.env.REACT_APP_ENABLE_AI_CHAT === 'true';
  }
  
  if (process.env.REACT_APP_ENABLE_VOICE_FEATURES !== undefined) {
    envOverrides.voiceFeatures = process.env.REACT_APP_ENABLE_VOICE_FEATURES === 'true';
  }
  
  if (process.env.REACT_APP_ENABLE_ANALYTICS !== undefined) {
    envOverrides.analytics = process.env.REACT_APP_ENABLE_ANALYTICS === 'true';
  }
  
  // Return the appropriate feature set
  const baseFeatures = isDevelopment ? developmentFeatures : defaultFeatures;
  
  return {
    ...baseFeatures,
    ...envOverrides,
  };
};

// Export the current feature flags
export const features = getFeatureFlags();

// Helper functions for checking specific features
export const isAiChatEnabled = () => features.aiChat;
export const areVoiceFeaturesEnabled = () => features.voiceFeatures;
export const isAnalyticsEnabled = () => features.analytics;

// Debug function to log current feature state
export const logFeatureFlags = () => {
  console.log('🚀 Feature Flags:', {
    environment: process.env.NODE_ENV,
    features: features,
  });
};
