import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.medivoiceai.app',
  appName: 'MediVoiceAI',
  webDir: 'out',   
  server: {
    url: "https://ai-driven-symptom-checker.vercel.app", 
    cleartext: true
  }
};

export default config;
