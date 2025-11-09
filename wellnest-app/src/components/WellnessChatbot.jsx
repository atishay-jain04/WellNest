import React, { useState, useRef, useEffect } from 'react';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import { IoSend } from 'react-icons/io5';
import { BiBot } from 'react-icons/bi';
import geminiService from '../services/geminiService';

const WellnessChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your wellness companion. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [useGemini, setUseGemini] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize Gemini on component mount
  useEffect(() => {
    const isInitialized = geminiService.initialize();
    setUseGemini(isInitialized);
  }, []);

  // Rule-based fallback responses
  const responses = {
    stress: [
      "Try taking 5 deep breaths. Inhale for 4 counts, hold for 4, exhale for 4.",
      "Consider taking a short walk or stretching for a few minutes.",
      "Remember: It's okay to take breaks. You're doing great!"
    ],
    anxiety: [
      "Ground yourself with the 5-4-3-2-1 technique: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, and 1 you taste.",
      "Try progressive muscle relaxation - tense and release each muscle group.",
      "Your feelings are valid. Take it one moment at a time."
    ],
    sleep: [
      "Establish a bedtime routine: dim lights, avoid screens 30 minutes before bed.",
      "Try a guided meditation or calming music before sleep.",
      "Keep your bedroom cool, dark, and quiet for better sleep quality."
    ],
    meditation: [
      "Start with just 5 minutes a day. Find a quiet space and focus on your breath.",
      "Try our Zen Mode for guided meditation experiences!",
      "Consistency is key - same time, same place helps build the habit."
    ],
    productivity: [
      "Use the Pomodoro technique - 25 minutes of focused work, then a 5-minute break.",
      "Check out our Focus Timer to boost your productivity!",
      "Break large tasks into smaller, manageable chunks."
    ],
    default: [
      "I'm here to help with stress, anxiety, sleep, meditation, or productivity tips. What's on your mind?",
      "Feel free to ask me about managing stress, improving sleep, or staying productive!",
      "I can provide wellness tips and mindfulness techniques. How can I support you?"
    ]
  };

  const getFallbackResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('stress') || lowerMessage.includes('stressed')) {
      return responses.stress[Math.floor(Math.random() * responses.stress.length)];
    } else if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('worried')) {
      return responses.anxiety[Math.floor(Math.random() * responses.anxiety.length)];
    } else if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia') || lowerMessage.includes('tired')) {
      return responses.sleep[Math.floor(Math.random() * responses.sleep.length)];
    } else if (lowerMessage.includes('meditat') || lowerMessage.includes('mindful')) {
      return responses.meditation[Math.floor(Math.random() * responses.meditation.length)];
    } else if (lowerMessage.includes('focus') || lowerMessage.includes('productive') || lowerMessage.includes('work')) {
      return responses.productivity[Math.floor(Math.random() * responses.productivity.length)];
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! I'm here to support your wellness journey. What would you like to talk about?";
    } else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're welcome! Remember, taking care of yourself is important. I'm here whenever you need support.";
    } else {
      return responses.default[Math.floor(Math.random() * responses.default.length)];
    }
  };

  const handleSend = async () => {
    if (inputText.trim() === '') return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText('');
    setIsLoading(true);

    // Use setTimeout to ensure state updates complete
    setTimeout(async () => {
      try {
        let botResponseText;

        // Try Gemini API first if available
        if (useGemini && geminiService.isAvailable()) {
          try {
            console.log('🟢 Using Gemini API for:', currentInput);
            botResponseText = await geminiService.generateResponse(currentInput);
            console.log('🟢 Got response from Gemini:', botResponseText);
          } catch (error) {
            console.error('🔴 Gemini API error, falling back to rule-based:', error);
            botResponseText = getFallbackResponse(currentInput);
          }
        } else {
          console.log('🟡 Using fallback responses');
          botResponseText = getFallbackResponse(currentInput);
        }

        console.log('🟣 Final response text:', botResponseText);
        console.log('🟣 Response type:', typeof botResponseText);
        console.log('🟣 Response truthy:', !!botResponseText);

        // Add bot response
        const botMessage = {
          id: Date.now() + 1,
          text: botResponseText || 'Sorry, I had trouble generating a response.',
          sender: 'bot',
          timestamp: new Date()
        };

        console.log('🟣 Created message:', botMessage);

        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);

      } catch (error) {
        console.error('🔴 Error getting response:', error);
        const errorMessage = {
          id: Date.now() + 1,
          text: "I'm having trouble processing that right now. Please try again.",
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
        setIsLoading(false);
      }
    }, 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Quick suggestions
  const suggestions = [
    "I'm feeling stressed",
    "Tips for better sleep",
    "How to meditate",
    "Boost productivity"
  ];

  return (
    <div className="flex flex-col h-full p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-2">
          <HiOutlineChatBubbleLeftRight className="text-5xl text-gray-700" />
          <h1 className="text-4xl font-bold text-gray-800">Wellness Chatbot</h1>
        </div>
        <div className="flex items-center justify-center gap-2">
          <p className="text-gray-600 text-lg">
            Your personal wellness companion
          </p>
          {useGemini && (
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
              AI Powered
            </span>
          )}
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 bg-gray-50 rounded-3xl p-6 mb-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={`${message.id}-${index}`}
            className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] px-6 py-3 rounded-3xl ${
                message.sender === 'user'
                  ? 'bg-accent text-white'
                  : 'bg-white text-gray-800 shadow-md'
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-white text-gray-800 shadow-md px-6 py-3 rounded-3xl">
              <div className="flex items-center gap-2">
                <BiBot className="text-xl animate-pulse" />
                <span className="text-sm">Thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      {messages.length === 1 && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2 text-center">Quick suggestions:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setInputText(suggestion)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300 transition-all duration-300"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          placeholder="Type your message..."
          className="flex-1 px-6 py-4 rounded-full bg-gray-100 border-2 border-gray-200 focus:border-accent focus:outline-none transition-all duration-300 disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={inputText.trim() === '' || isLoading}
          className={`px-6 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 ${
            inputText.trim() === '' || isLoading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-accent text-white hover:bg-red-600'
          }`}
        >
          <IoSend className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default WellnessChatbot;
