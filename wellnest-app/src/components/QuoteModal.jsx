import React, { useEffect, useState } from 'react';
import { IoCloseCircle } from 'react-icons/io5';

/**
 * QuoteModal Component
 * Displays a motivational quote when all tasks are completed
 * Shows with a smooth fade-in animation and celebration effect
 */
const QuoteModal = ({ isOpen, onClose }) => {
  const [quote, setQuote] = useState('');

  // Collection of positive wellness quotes
  const quotes = [
    "You've earned your Zen time 💫",
    "Amazing work! Your dedication is inspiring 🌟",
    "All tasks complete! Time to celebrate your productivity 🎉",
    "You're crushing it today! Well done 💪",
    "Peace comes from within. You've found yours today 🌿",
    "Success is the sum of small efforts. You nailed it! ✨",
    "Today's accomplishments are tomorrow's foundations 🏔️",
    "You've mastered your day. Time to relax and recharge 🧘",
    "Productivity achieved! Your future self thanks you 🙏",
    "Every completed task is a step towards your goals 🎯"
  ];

  useEffect(() => {
    if (isOpen) {
      // Select a random quote
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(randomQuote);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <IoCloseCircle className="text-3xl" />
        </button>

        {/* Celebration Icon */}
        <div className="text-center mb-6">
          <div className="inline-block text-7xl animate-bounce">
            🎉
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
          All Done!
        </h2>

        {/* Quote */}
        <p className="text-xl text-gray-700 text-center font-medium mb-6 leading-relaxed">
          {quote}
        </p>

        {/* Decorative Elements */}
        <div className="flex justify-center gap-2 mb-6">
          <span className="text-2xl animate-pulse">⭐</span>
          <span className="text-2xl animate-pulse delay-75">✨</span>
          <span className="text-2xl animate-pulse delay-150">⭐</span>
        </div>

        {/* Message */}
        <p className="text-sm text-gray-500 text-center italic mb-6">
          Take a moment to celebrate your accomplishments. You deserve it!
        </p>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-full hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default QuoteModal;
