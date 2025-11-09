# Gemini API Setup Guide for Wellnest Chatbot

The Wellnest chatbot now supports **Google Gemini AI** for intelligent, context-aware wellness conversations! Follow these steps to enable it.

## 🚀 Quick Setup

### Step 1: Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Get API Key"** or **"Create API Key"**
4. Copy your API key (it will look like: `AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`)

### Step 2: Create `.env` File

1. In the `wellnest-app` folder, create a new file named `.env` (not `.env.example`)
2. Add your API key to the file:

```env
VITE_GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

⚠️ **Important:** Replace `AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` with your actual API key!

### Step 3: Restart Dev Server

If your dev server is already running:

```bash
# Stop the server (Ctrl+C in terminal)
# Then restart it:
npm run dev
```

### Step 4: Verify It's Working

1. Open the app in your browser
2. Navigate to the **Chatbot** tab
3. Look for the green **"AI Powered"** badge next to the title
4. Check the browser console for: `✅ Gemini API initialized successfully`

## 🔄 Fallback Behavior

The chatbot has **intelligent fallback**:
- ✅ If Gemini API is configured → Uses AI responses
- ⚠️ If API key is missing/invalid → Uses rule-based responses automatically
- 🛡️ If API fails → Falls back gracefully to rule-based responses

No crashes, always works! 🎉

## 🧪 Testing

Try these prompts to see the difference:
- "I'm feeling overwhelmed with work deadlines"
- "How can I build a consistent meditation practice?"
- "What are some ways to improve my sleep quality?"

## 🔐 Security Notes

- Never commit your `.env` file to Git (it's already in `.gitignore`)
- Keep your API key private
- Don't share your API key in screenshots or public repos

## 📊 API Usage

Google provides a **free tier** for Gemini API:
- 60 requests per minute
- Plenty for personal/demo use
- Check [pricing](https://ai.google.dev/pricing) for details

## 🛠️ Troubleshooting

### "API key not configured" warning
- Check that `.env` file exists in `wellnest-app` folder (not in parent folder)
- Verify the key starts with `VITE_` (required for Vite)
- Make sure you restarted the dev server

### Still seeing rule-based responses
- Open browser console (F12)
- Look for errors or warnings
- Verify the "AI Powered" badge appears
- Check that your API key is valid

### API quota exceeded
- You've hit the free tier limit
- Wait a minute or upgrade your plan
- Fallback responses will work automatically

## 📝 What Was Changed

1. **Added files:**
   - `src/services/geminiService.js` - Gemini API integration
   - `.env.example` - Template for environment variables
   - `GEMINI_SETUP.md` - This guide

2. **Modified files:**
   - `src/components/WellnessChatbot.jsx` - Now uses Gemini with fallback

3. **Installed packages:**
   - `@google/generative-ai` - Google's official SDK

## 🎯 Features

- ✅ Context-aware AI responses
- ✅ Wellness-focused system prompt
- ✅ Loading states with "Thinking..." indicator
- ✅ Error handling with automatic fallback
- ✅ "AI Powered" badge when active
- ✅ Same UI/UX as before

Enjoy your AI-powered wellness companion! 🌿
