import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.VITE_GEMINI_API_KEY;

async function listModels() {
  console.log('\n📋 Listing Available Gemini Models...\n');

  if (!API_KEY) {
    console.log('❌ API key not found\n');
    return;
  }

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);

    console.log('Fetching models...\n');

    // Try to list models using the API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.models && data.models.length > 0) {
      console.log('✅ Available models:\n');
      data.models.forEach((model, index) => {
        console.log(`${index + 1}. ${model.name}`);
        console.log(`   Display Name: ${model.displayName}`);
        console.log(`   Description: ${model.description}`);
        if (model.supportedGenerationMethods) {
          console.log(`   Supported Methods: ${model.supportedGenerationMethods.join(', ')}`);
        }
        console.log('');
      });
    } else {
      console.log('No models found');
    }

  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

listModels();
