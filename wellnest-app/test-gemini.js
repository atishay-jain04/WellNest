import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const API_KEY = process.env.VITE_GEMINI_API_KEY;

async function testGeminiAPI() {
  console.log('\n🧪 Testing Gemini API Connection...\n');

  if (!API_KEY || API_KEY === 'your_gemini_api_key_here') {
    console.log('❌ API key not found or not configured');
    console.log('Please set VITE_GEMINI_API_KEY in your .env file\n');
    return;
  }

  console.log('✅ API key found:', API_KEY.substring(0, 15) + '...');

  try {
    console.log('\n📡 Initializing Gemini...');
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    console.log('✅ Gemini initialized successfully');

    console.log('\n💬 Sending test message: "Hello, can you help with stress?"');
    const result = await model.generateContent('Hello, can you help with stress? Respond in one sentence.');
    const response = await result.response;
    const text = response.text();

    console.log('\n✅ API Response:');
    console.log('---');
    console.log(text);
    console.log('---\n');

    console.log('🎉 Success! Gemini API is working correctly!\n');

  } catch (error) {
    console.log('\n❌ Error testing API:');
    console.log('Error type:', error.name);
    console.log('Error message:', error.message);

    if (error.message.includes('API key')) {
      console.log('\n💡 Your API key might be invalid. Please check:');
      console.log('1. Go to https://makersuite.google.com/app/apikey');
      console.log('2. Create a new API key');
      console.log('3. Update your .env file with the new key\n');
    }
  }
}

testGeminiAPI();
