import React from 'react';
import { useTimer, useGameState } from './gameHooks.js';
import { selectRandomWord, selectSpies } from './gameUtils.js';
import { 
  HomeScreen, 
  RulesScreen, 
  HistoryScreen, 
  PlayersScreen,
  PlayingScreen,
  TimerScreen,
  RevealScreen 
} from './GameScreens.jsx';
import CategoryScreen from './CategoryScreen.jsx';
import SettingsOverlay from './SettingsOverlay.jsx';

const SpyWordGame = () => {
  const {
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
  } = useGameState();

  const { 
    timeLeft, 
    timerActive, 
    setTimerActive, 
    resetTimer, 
    startTimer 
  } = useTimer(customTimer, soundEnabled);

  const startGame = () => {
    const randomWord = selectRandomWord(selectedCategory, gameHistory);
    const randomSpies = selectSpies(playerCount, spyCount);
    
    setCurrentWord(randomWord);
    setSpyIndices(randomSpies);
    setCurrentPlayer(0);
    setPlayersReady(0);
    setShowingRole(false);
    resetTimer(customTimer);
    setGameState('playing');
  };

  const nextPlayer = () => {
    if (currentPlayer < playerCount - 1) {
      setCurrentPlayer(currentPlayer + 1);
    } else {
      startTimer();
      setGameState('timer');
    }
    setShowingRole(false);
  };

  const showRole = () => {
    setShowingRole(true);
    setPlayersReady(playersReady + 1);
  };

  const endGame = (spyWon = false) => {
    const gameResult = {
      category: selectedCategory,
      word: currentWord,
      spyIndices,
      playerCount,
      spyCount,
      spyWon,
      timestamp: Date.now()
    };
    
    setGameHistory(prev => [...prev.slice(-9), gameResult]);
    setGameState('reveal');
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setGameState('players');
  };

  // Screen routing
  if (gameState === 'home') {
    return (
      <>
        <HomeScreen
          onStartGame={() => setGameState('categories')}
          onViewRules={() => setGameState('rules')}
          onShowSettings={() => setShowStats(true)}
          onShowHistory={() => setGameState('history')}
          gameHistory={gameHistory}
        />
        {showStats && (
          <SettingsOverlay 
            customTimer={customTimer}
            setCustomTimer={setCustomTimer}
            soundEnabled={soundEnabled}
            setSoundEnabled={setSoundEnabled}
            onClose={() => setShowStats(false)}
          />
        )}
      </>
    );
  }

  if (gameState === 'rules') {
    return <RulesScreen onBack={() => setGameState('home')} />;
  }

  if (gameState === 'history') {
    return (
      <HistoryScreen 
        gameHistory={gameHistory}
        onBack={() => setGameState('home')}
      />
    );
  }

  if (gameState === 'categories') {
    return (
      <CategoryScreen
        onCategorySelect={handleCategorySelect}
        onBack={() => setGameState('home')}
      />
    );
  }

  if (gameState === 'players') {
    return (
      <PlayersScreen
        selectedCategory={selectedCategory}
        playerCount={playerCount}
        setPlayerCount={setPlayerCount}
        spyCount={spyCount}
        setSpyCount={setSpyCount}
        customTimer={customTimer}
        setCustomTimer={setCustomTimer}
        onStartGame={startGame}
        onBack={() => setGameState('categories')}
      />
    );
  }

  if (gameState === 'playing') {
    return (
      <PlayingScreen
        currentPlayer={currentPlayer}
        playerCount={playerCount}
        selectedCategory={selectedCategory}
        currentWord={currentWord}
        spyIndices={spyIndices}
        showingRole={showingRole}
        onShowRole={showRole}
        onNextPlayer={nextPlayer}
      />
    );
  }

  if (gameState === 'timer') {
    return (
      <TimerScreen
        timeLeft={timeLeft}
        timerActive={timerActive}
        setTimerActive={setTimerActive}
        onEndGame={() => endGame()}
        onRevealAnswer={() => setGameState('reveal')}
      />
    );
  }

  // Reveal Screen
  return (
    <RevealScreen
      selectedCategory={selectedCategory}
      currentWord={currentWord}
      spyIndices={spyIndices}
      onSpyWon={() => endGame(true)}
      onOthersWon={() => endGame(false)}
      onPlayAgain={startGame}
      onMainMenu={resetGame}
    />
  );
};

export default SpyWordGame;