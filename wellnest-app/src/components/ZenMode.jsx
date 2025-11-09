import React, { useState, useEffect, useRef } from 'react';
import { PiTreePalmLight, PiWavesLight, PiMountainsLight, PiCloudRainLight } from 'react-icons/pi';
import { HiOutlinePlay, HiOutlinePause } from 'react-icons/hi2';
import { HiOutlineVolumeUp, HiOutlineVolumeOff } from 'react-icons/hi';
import { IoCloseOutline } from 'react-icons/io5';
import { RiMentalHealthLine } from 'react-icons/ri';
import forestSerenityBg from '../assets/zenBackground/forest_Serenity.jpg';
import oceanWavesBg from '../assets/zenBackground/Ocean_waves.jpg';
import mountainPeaceBg from '../assets/zenBackground/Mountain_peace.jpg';
import rainfallCalmBg from '../assets/zenBackground/raining_calm.jpg';

const ZenMode = () => {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // Define 4 zen themes
  const themes = [
    {
      id: 1,
      name: 'Forest Serenity',
      caption: 'Phone Down, Let\'s enjoy life',
      backgroundImage: forestSerenityBg,
      sound: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c3c6d84f7e.mp3',
      icon: PiTreePalmLight
    },
    {
      id: 2,
      name: 'Ocean Waves',
      caption: 'Phone Down, Let\'s enjoy life',
      backgroundImage: oceanWavesBg,
      sound: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
      icon: PiWavesLight
    },
    {
      id: 3,
      name: 'Mountain Peace',
      caption: 'Phone Down, Let\'s enjoy life',
      backgroundImage: mountainPeaceBg,
      sound: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_4deafeec1a.mp3',
      icon: PiMountainsLight
    },
    {
      id: 4,
      name: 'Rainfall Calm',
      caption: 'Phone Down, Let\'s enjoy life',
      backgroundImage: rainfallCalmBg,
      sound: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_bb630cc098.mp3',
      icon: PiCloudRainLight
    }
  ];

  // Load saved theme from session storage
  useEffect(() => {
    const savedThemeId = sessionStorage.getItem('selectedZenTheme');
    if (savedThemeId) {
      const theme = themes.find(t => t.id === parseInt(savedThemeId));
      if (theme) {
        setSelectedTheme(theme);
      }
    }
  }, []);

  // Save theme to session storage
  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
    sessionStorage.setItem('selectedZenTheme', theme.id.toString());
    setIsFullscreen(false);
    setIsPlaying(false);
  };

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      // Enter fullscreen
      setIsFullscreen(true);
      if (audioRef.current && selectedTheme) {
        audioRef.current.src = selectedTheme.sound;
        audioRef.current.loop = true;
        audioRef.current.volume = 0.7; // Set initial volume to 70%

        // Small delay to ensure audio is loaded before playing
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.play()
              .then(() => {
                console.log('✅ Audio playing successfully');
                setIsPlaying(true);
              })
              .catch(err => {
                console.error('❌ Audio play failed:', err);
                console.log('🔔 Click the Play button to start audio');
                setIsPlaying(false);
              });
          }
        }, 100);
      }
    } else {
      // Exit fullscreen
      exitZenMode();
    }
  };

  // Exit zen mode
  const exitZenMode = () => {
    // Stop audio first
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = ''; // Clear the source
    }
    setIsPlaying(false);
    setIsFullscreen(false);
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        console.log('⏸️ Audio paused');
      } else {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            console.log('▶️ Audio playing');
          })
          .catch(err => {
            console.error('❌ Audio play error:', err);
            alert('Unable to play audio. Please check your browser settings and network connection.');
          });
      }
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Fullscreen view
  if (isFullscreen && selectedTheme) {
    return (
      <div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center transition-all duration-500 bg-cover bg-center"
        style={{
          backgroundImage: `url(${selectedTheme.backgroundImage})`,
          backgroundColor: 'rgba(0,0,0,0.3)',
          backgroundBlendMode: 'darken'
        }}
      >
        {/* Caption */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
            {selectedTheme.name}
          </h1>
          <p className="text-2xl text-white/90 italic drop-shadow-md">
            {selectedTheme.caption}
          </p>
        </div>

        {/* Large Icon */}
        <div className="mb-12 animate-pulse">
          {React.createElement(selectedTheme.icon, { className: 'text-[12rem] text-white' })}
        </div>

        {/* Controls */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={togglePlayPause}
            className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full hover:bg-white/30 transition-all duration-300 font-medium shadow-lg flex items-center gap-2"
          >
            {isPlaying ? (
              <>
                <HiOutlinePause className="text-xl" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <HiOutlinePlay className="text-xl" />
                <span>Play</span>
              </>
            )}
          </button>

          <button
            onClick={toggleMute}
            className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full hover:bg-white/30 transition-all duration-300 font-medium shadow-lg flex items-center gap-2"
          >
            {isMuted ? (
              <>
                <HiOutlineVolumeOff className="text-xl" />
                <span>Unmute</span>
              </>
            ) : (
              <>
                <HiOutlineVolumeUp className="text-xl" />
                <span>Mute</span>
              </>
            )}
          </button>

          <button
            onClick={exitZenMode}
            className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full hover:bg-white/30 transition-all duration-300 font-medium shadow-lg flex items-center gap-2"
          >
            <IoCloseOutline className="text-xl" />
            <span>Exit</span>
          </button>
        </div>

        <audio
          ref={audioRef}
          preload="auto"
          onLoadStart={() => console.log('🔄 Loading audio...')}
          onCanPlay={() => console.log('✅ Audio ready to play')}
          onError={(e) => console.error('❌ Audio error:', e)}
        />
      </div>
    );
  }

  // Theme selection view
  return (
    <div className="flex flex-col h-full p-6">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-2">
          <RiMentalHealthLine className="text-5xl text-gray-700" />
          <h1 className="text-4xl font-bold text-gray-800">Zen Mode</h1>
        </div>
        <p className="text-gray-600 text-lg">
          Choose a theme to start your mindful break
        </p>
      </div>

      {/* Theme Cards Grid */}
      <div className="grid grid-cols-2 gap-6 mb-6 flex-1">
        {themes.map((theme) => {
          const ThemeIcon = theme.icon;
          return (
            <div
              key={theme.id}
              onClick={() => handleThemeSelect(theme)}
              className={`cursor-pointer rounded-3xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl relative ${
                selectedTheme?.id === theme.id ? 'ring-4 ring-accent shadow-2xl scale-105' : 'shadow-lg'
              }`}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${theme.backgroundImage})` }}
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40" />

              {/* Content */}
              <div className="relative z-10 p-8 text-center text-white">
                <ThemeIcon className="text-7xl mb-4 mx-auto drop-shadow-2xl" />
                <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">{theme.name}</h3>
                <p className="text-sm opacity-90 drop-shadow-lg">{theme.caption}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Start Button */}
      {selectedTheme && (
        <div className="text-center">
          <button
            onClick={toggleFullscreen}
            className="bg-accent text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Start Zen Mode
          </button>
          <p className="text-gray-500 mt-4 text-sm">
            Selected: {selectedTheme.name}
          </p>
        </div>
      )}
    </div>
  );
};

export default ZenMode;
