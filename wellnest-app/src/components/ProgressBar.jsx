import React from 'react';

/**
 * ProgressBar Component
 * Displays task completion progress with a gradient progress bar
 * Shows "X of Y tasks completed" with visual representation
 */
const ProgressBar = ({ completed, total }) => {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800">
          Today's Progress
        </h3>
        <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          {percentage}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden mb-3">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 via-emerald-500 to-blue-500 rounded-full transition-all duration-700 ease-out shadow-lg"
          style={{ width: `${percentage}%` }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
        </div>
      </div>

      {/* Task Count */}
      <p className="text-sm text-gray-600 font-medium">
        <span className="text-green-600 font-bold">{completed}</span> of{' '}
        <span className="text-gray-800 font-bold">{total}</span> tasks completed
      </p>

      {/* Motivational message based on progress */}
      {percentage > 0 && percentage < 100 && (
        <p className="mt-3 text-xs text-gray-500 italic">
          {percentage >= 75 ? "Almost there! You're doing amazing! 🌟" :
           percentage >= 50 ? "Great progress! Keep it up! 💪" :
           percentage >= 25 ? "You've started strong! 🚀" :
           "Every journey begins with a single step 🌱"}
        </p>
      )}
    </div>
  );
};

// Add shimmer animation to global styles or Tailwind config
// @keyframes shimmer {
//   0% { transform: translateX(-100%); }
//   100% { transform: translateX(100%); }
// }

export default ProgressBar;
