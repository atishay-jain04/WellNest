import React, { useState, useEffect, useRef } from 'react';
import { LuTimer, LuPlay, LuPause, LuRotateCcw, LuSettings, LuX } from 'react-icons/lu';
import timerBg from '../assets/timerBackground/cherry_blossom.jpg';

const FocusTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('pomodoro');
  const [showSettings, setShowSettings] = useState(false);
  const intervalRef = useRef(null);

  const [presets, setPresets] = useState({
    pomodoro: { time: 25, label: 'pomodoro' },
    shortBreak: { time: 5, label: 'short break' },
    longBreak: { time: 15, label: 'long break' },
  });

  const [tempPresets, setTempPresets] = useState(presets);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  const handlePresetChange = (presetKey) => {
    setSelectedPreset(presetKey);
    setIsRunning(false);
    setTimeLeft(presets[presetKey].time * 60);
  };

  const handlePlayPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(presets[selectedPreset].time * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOpenSettings = () => {
    setTempPresets(presets);
    setShowSettings(true);
  };

  const handleSaveSettings = () => {
    setPresets(tempPresets);
    setShowSettings(false);
    // Reset timer with new settings
    setIsRunning(false);
    setTimeLeft(tempPresets[selectedPreset].time * 60);
  };

  const handleCancelSettings = () => {
    setShowSettings(false);
    setTempPresets(presets);
  };

  const handlePresetTimeChange = (presetKey, newTime) => {
    const timeInMinutes = parseInt(newTime) || 1;
    setTempPresets({
      ...tempPresets,
      [presetKey]: {
        ...tempPresets[presetKey],
        time: Math.max(1, Math.min(120, timeInMinutes)) // Limit between 1 and 120 minutes
      }
    });
  };

  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${timerBg})` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-8">
        {/* Preset Buttons */}
        <div className="flex gap-4 mb-12">
          {Object.entries(presets).map(([key, preset]) => (
            <button
              key={key}
              onClick={() => handlePresetChange(key)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 backdrop-blur-sm ${
                selectedPreset === key
                  ? 'bg-white text-gray-800 shadow-lg'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Timer Display */}
        <div className="text-center mb-12">
          <div className="text-[8rem] font-bold text-white drop-shadow-2xl leading-none">
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-4">
          <button
            onClick={handlePlayPause}
            className="bg-white text-gray-800 px-10 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg"
          >
            {isRunning ? 'pause' : 'start'}
          </button>

          <button
            onClick={handleReset}
            className="bg-white/20 backdrop-blur-sm text-white p-4 rounded-full hover:bg-white/30 transition-all duration-300 shadow-lg"
            title="Reset"
          >
            <LuRotateCcw className="text-2xl" />
          </button>

          <button
            onClick={handleOpenSettings}
            className="bg-white/20 backdrop-blur-sm text-white p-4 rounded-full hover:bg-white/30 transition-all duration-300 shadow-lg"
            title="Settings"
          >
            <LuSettings className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Timer Settings</h2>
              <button
                onClick={handleCancelSettings}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <LuX className="text-2xl" />
              </button>
            </div>

            {/* Settings Form */}
            <div className="space-y-6">
              {Object.entries(tempPresets).map(([key, preset]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {preset.label}
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="1"
                      max="120"
                      value={preset.time}
                      onChange={(e) => handlePresetTimeChange(key, e.target.value)}
                      disabled={key === 'pomodoro'}
                      className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                        key === 'pomodoro'
                          ? 'bg-gray-100 border-gray-200 cursor-not-allowed text-gray-500'
                          : 'border-gray-200 focus:border-accent focus:outline-none'
                      }`}
                    />
                    <span className="text-gray-600 font-medium">minutes</span>
                  </div>
                  {key === 'pomodoro' && (
                    <p className="text-xs text-gray-500 mt-1">Pomodoro duration is fixed at 25 minutes</p>
                  )}
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={handleCancelSettings}
                className="flex-1 px-6 py-3 rounded-full bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSettings}
                className="flex-1 px-6 py-3 rounded-full bg-accent text-white font-semibold hover:bg-red-600 transition-all duration-300 shadow-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FocusTimer;
