import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  constructor() {
    this.genAI = null;
    this.model = null;
    this.isInitialized = false;
  }

  initialize() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      console.warn('Gemini API key not configured. Using fallback responses.');
      return false;
    }

    try {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 5000, // Increased to allow very detailed, comprehensive responses
        },
      });
      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize Gemini:', error);
      return false;
    }
  }

  async generateResponse(userMessage, conversationHistory = []) {
    if (!this.isInitialized) {
      throw new Error('Gemini service not initialized');
    }

    try {
      // System prompt for wellness chatbot context
      const systemPrompt = `You are a compassionate wellness chatbot assistant. Your role is to:
- Provide supportive and empathetic responses about mental health and wellness
- Offer practical tips for stress management, meditation, sleep, and productivity
- Keep responses concise and focused (maximum 10 lines)
- Include actionable steps, techniques, or exercises when relevant
- Explain the "why" behind your suggestions to help users understand the benefits
- Be encouraging, positive, and understanding in your tone
- Never provide medical advice or diagnosis
- Suggest professional help when appropriate for serious concerns
- Use plain text only - do not use markdown formatting (no *, **, _, etc.)
- Write in a conversational, natural style

User message: ${userMessage}

Provide a helpful, supportive, and concise response in plain text (maximum 10 lines, no markdown):`;

      console.log('🔵 Calling Gemini API...');
      const result = await this.model.generateContent(systemPrompt);
      console.log('🔵 Got result:', result);

      const response = await result.response;
      console.log('🔵 Got response:', response);
      console.log('🔵 Response candidates:', response.candidates);
      console.log('🔵 Response text function:', typeof response.text);

      const text = response.text();
      console.log('🔵 Extracted text:', text);
      console.log('🔵 Text type:', typeof text);
      console.log('🔵 Text length:', text?.length);

      // Check if there are candidates with content
      if (response.candidates && response.candidates.length > 0) {
        const candidate = response.candidates[0];
        console.log('🔵 First candidate:', candidate);
        console.log('🔵 Candidate keys:', Object.keys(candidate));
        console.log('🔵 Candidate content:', candidate.content);
        console.log('🔵 Candidate finishReason:', candidate.finishReason);
        console.log('🔵 Candidate safetyRatings:', candidate.safetyRatings);

        if (candidate.content) {
          console.log('🔵 Content keys:', Object.keys(candidate.content));
          console.log('🔵 Candidate parts:', candidate.content.parts);
        }
      }

      // If text is empty, try to manually extract from candidates
      if (!text || text.trim() === '') {
        console.log('⚠️ Text extraction failed, trying manual extraction...');
        if (response.candidates?.[0]?.content?.parts?.[0]?.text) {
          const manualText = response.candidates[0].content.parts[0].text;
          console.log('✅ Manually extracted text:', manualText);
          return manualText.trim();
        }
      }

      return text.trim();
    } catch (error) {
      console.error('❌ Error generating response:', error);
      console.error('❌ Error stack:', error.stack);
      throw error;
    }
  }

  // Check if API is available and initialized
  isAvailable() {
    return this.isInitialized;
  }
}

// Create singleton instance
const geminiService = new GeminiService();

export default geminiService;
