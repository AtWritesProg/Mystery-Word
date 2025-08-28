import { useState, useEffect } from 'react';

// Timer Hook
export const useTimer = (initialTime, soundEnabled) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let interval;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          if (newTime === 10 && soundEnabled) {
          }
          if (newTime === 0 && soundEnabled) {
          }
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft, soundEnabled]);

  const resetTimer = (newTime) => {
    setTimeLeft(newTime);
    setTimerActive(false);
  };

  const startTimer = () => {
    setTimerActive(true);
  };

  return { 
    timeLeft, 
    timerActive, 
    setTimerActive, 
    resetTimer, 
    startTimer 
  };
};

// Game State Hook
export const useGameState = () => {
  const [gameState, setGameState] = useState('home');
  const [playerCount, setPlayerCount] = useState(4);
  const [spyCount, setSpyCount] = useState(1);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentWord, setCurrentWord] = useState('');
  const [spyIndices, setSpyIndices] = useState([]);
  const [showingRole, setShowingRole] = useState(false);
  const [playersReady, setPlayersReady] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [gameHistory, setGameHistory] = useState([]);
  const [customTimer, setCustomTimer] = useState(90);
  const [showStats, setShowStats] = useState(false);

  // Update spy count when player count changes
  useEffect(() => {
    const maxSpies = Math.max(1, Math.floor(playerCount / 2));
    if (spyCount > maxSpies) {
      setSpyCount(maxSpies);
    }
  }, [playerCount, spyCount]);

  const resetGame = () => {
    setGameState('home');
    setCurrentPlayer(0);
    setShowingRole(false);
    setPlayersReady(0);
    setSelectedCategory('');
    setCurrentWord('');
    setSpyIndices([]);
  };

  return {
    gameState, setGameState,
    playerCount, setPlayerCount,
    spyCount, setSpyCount,
    currentPlayer, setCurrentPlayer,
    selectedCategory, setSelectedCategory,
    currentWord, setCurrentWord,
    spyIndices, setSpyIndices,
    showingRole, setShowingRole,
    playersReady, setPlayersReady,
    soundEnabled, setSoundEnabled,
    gameHistory, setGameHistory,
    customTimer, setCustomTimer,
    showStats, setShowStats,
    resetGame
  };
};