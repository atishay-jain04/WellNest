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

// Import Forest Serenity music
import forestBirdsRiver from '../assets/music/forestSerenity/birds-forest-river-409229.mp3';
import forestAmbience from '../assets/music/forestSerenity/forest-ambience-296528.mp3';
import forestBirds from '../assets/music/forestSerenity/forestbirds-319791.mp3';

// Import Ocean Waves music
import oceanWavesLoop from '../assets/music/OceanWaves/mixkit-sea-waves-loop-1196.wav';
import oceanBeachWaves from '../assets/music/OceanWaves/ocean-beach-waves-332383.mp3';
import oceanWaves from '../assets/music/OceanWaves/ocean-waves-250310.mp3';

// Import Mountain Peace music
import mountainStream from '../assets/music/MountainPeace/the-sound-of-a-mountain-stream-_nature-sound-201930.mp3';
import forestPath from '../assets/music/MountainPeace/forest-path-avala-mountains-246781.mp3';

// Import Raining Calm music
import calmingRain from '../assets/music/RainingCalm/calming-rain-257596.mp3';
import gentleRain from '../assets/music/RainingCalm/gentle-rain-for-relaxation-and-sleep-337279.mp3';
import rainSound from '../assets/music/RainingCalm/rain-sound-188158.mp3';

const ZenMode = () => {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentMusicUrl, setCurrentMusicUrl] = useState('');
  const audioRef = useRef(null);

  // Define 4 zen themes with their music arrays
  const themes = [
    {
      id: 1,
      name: 'Forest Serenity',
      caption: 'Phone Down, Let\'s enjoy life',
      backgroundImage: forestSerenityBg,
      musicFiles: [forestBirdsRiver, forestAmbience, forestBirds],
      icon: PiTreePalmLight
    },
    {
      id: 2,
      name: 'Ocean Waves',
      caption: 'Phone Down, Let\'s enjoy life',
      backgroundImage: oceanWavesBg,
      musicFiles: [oceanWavesLoop, oceanBeachWaves, oceanWaves],
      icon: PiWavesLight
    },
    {
      id: 3,
      name: 'Mountain Peace',
      caption: 'Phone Down, Let\'s enjoy life',
      backgroundImage: mountainPeaceBg,
      musicFiles: [mountainStream, forestPath],
      icon: PiMountainsLight
    },
    {
      id: 4,
      name: 'Rainfall Calm',
      caption: 'Phone Down, Let\'s enjoy life',
      backgroundImage: rainfallCalmBg,
      musicFiles: [calmingRain, gentleRain, rainSound],
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
      
      // Wait for next tick to ensure component is rendered
      setTimeout(() => {
        if (audioRef.current && selectedTheme) {
          // Select a random music file from the theme's music array
          const randomIndex = Math.floor(Math.random() * selectedTheme.musicFiles.length);
          const selectedMusic = selectedTheme.musicFiles[randomIndex];
          
          setCurrentMusicUrl(selectedMusic);
          
          audioRef.current.src = selectedMusic;
          audioRef.current.loop = true;
          audioRef.current.volume = 0.7;
          audioRef.current.load();

          // Try to play after load
          audioRef.current.addEventListener('canplaythrough', () => {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
              playPromise
                .then(() => {
                  setIsPlaying(true);
                })
                .catch(err => {
                  console.error('Audio play failed:', err);
                  setIsPlaying(false);
                });
            }
          }, { once: true });
        }
      }, 200);
    } else {
      // Exit fullscreen
      exitZenMode();
    }
  };

  // Exit zen mode
  const exitZenMode = () => {
    setIsFullscreen(false);
    setIsPlaying(false);
    
    // Stop audio after state updates
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.src = ''; // Clear the source
      }
    }, 50);
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.load();
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(err => {
              console.error('Audio play error:', err);
              setIsPlaying(false);
            });
        }
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
        className="fixed inset-0 z-100 flex flex-col items-center justify-center transition-all duration-500 bg-cover bg-center"
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
