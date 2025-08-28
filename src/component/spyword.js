import React, { useState, useEffect } from 'react';
import { Users, Play, RotateCcw, Eye, EyeOff, Clock, Home, BookOpen, X, ArrowLeft, Volume2, VolumeX, Pause, SkipForward } from 'lucide-react';

const SpyWordGame = () => {
  const [gameState, setGameState] = useState('home');
  const [playerCount, setPlayerCount] = useState(4);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentWord, setCurrentWord] = useState('');
  const [spyIndex, setSpyIndex] = useState(-1);
  const [showingRole, setShowingRole] = useState(false);
  const [playersReady, setPlayersReady] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const [timerActive, setTimerActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [gameHistory, setGameHistory] = useState([]);
  const [customTimer, setCustomTimer] = useState(90);
  const [showStats, setShowStats] = useState(false);

  const categories = {
    'Animals': [
      'Elephant', 'Lion', 'Penguin', 'Dolphin', 'Tiger', 'Monkey', 'Eagle', 'Shark', 'Giraffe', 'Bear',
      'Zebra', 'Kangaroo', 'Whale', 'Snake', 'Butterfly', 'Horse', 'Dog', 'Cat', 'Rabbit', 'Wolf',
      'Fox', 'Deer', 'Owl', 'Parrot', 'Turtle', 'Frog', 'Crocodile', 'Hippo', 'Rhino', 'Panda'
    ],
    'Food': [
      'Pizza', 'Burger', 'Ice Cream', 'Chocolate', 'Apple', 'Sandwich', 'Pasta', 'Cookie', 'Cake', 'Banana',
      'Coffee', 'Tea', 'Bread', 'Rice', 'Chicken', 'Fish', 'Salad', 'Soup', 'Cheese', 'Orange',
      'Mango', 'Grapes', 'Strawberry', 'Donut', 'Pancake', 'Noodles', 'Taco', 'Sushi', 'Popcorn', 'Honey'
    ],
    'Movies': [
      'Superhero', 'Comedy', 'Horror', 'Romance', 'Action', 'Cartoon', 'Thriller', 'Musical', 'Drama', 'Adventure',
      'Sci-Fi', 'Fantasy', 'Mystery', 'Western', 'Documentary', 'Animation', 'War', 'Crime', 'Family', 'Biography',
      'Sports', 'Historical', 'Disaster', 'Zombie', 'Vampire', 'Space', 'Time Travel', 'Magic', 'Pirate', 'Ninja'
    ],
    'Places': [
      'Beach', 'Mountain', 'Forest', 'Desert', 'City', 'Hospital', 'School', 'Park', 'Airport', 'Mall',
      'Library', 'Restaurant', 'Hotel', 'Museum', 'Zoo', 'Stadium', 'Theater', 'Bank', 'Church', 'Market',
      'Bridge', 'Island', 'Cave', 'Waterfall', 'Garden', 'Factory', 'Office', 'Gym', 'Pool', 'Farm'
    ],
    'Sports': [
      'Football', 'Basketball', 'Tennis', 'Swimming', 'Running', 'Cricket', 'Baseball', 'Soccer', 'Boxing', 'Golf',
      'Volleyball', 'Badminton', 'Hockey', 'Wrestling', 'Skiing', 'Cycling', 'Surfing', 'Bowling', 'Archery', 'Karate',
      'Yoga', 'Dancing', 'Climbing', 'Racing', 'Fishing', 'Sailing', 'Skating', 'Diving', 'Gymnastics', 'Martial Arts'
    ],
    'Objects': [
      'Phone', 'Car', 'Book', 'Chair', 'Computer', 'Watch', 'Camera', 'Guitar', 'Bicycle', 'Umbrella',
      'Key', 'Mirror', 'Lamp', 'Pen', 'Glasses', 'Bag', 'Shoes', 'Hat', 'Clock', 'Pillow',
      'Blanket', 'Knife', 'Spoon', 'Plate', 'Cup', 'Bottle', 'Television', 'Radio', 'Fan', 'Window'
    ],
    'Professions': [
      'Doctor', 'Teacher', 'Chef', 'Pilot', 'Artist', 'Engineer', 'Singer', 'Dancer', 'Writer', 'Farmer',
      'Police', 'Firefighter', 'Nurse', 'Lawyer', 'Soldier', 'Driver', 'Carpenter', 'Plumber', 'Electrician', 'Mechanic',
      'Actor', 'Musician', 'Photographer', 'Designer', 'Scientist', 'Judge', 'Dentist', 'Barber', 'Baker', 'Tailor'
    ],
    'Technology': [
      'Smartphone', 'Laptop', 'Internet', 'Robot', 'Drone', 'VR Headset', 'AI Assistant', 'Smart Watch', 'Tablet', 'Gaming Console',
      'Satellite', 'GPS', 'Bluetooth', 'WiFi', 'Social Media', 'Video Call', 'Cloud Storage', 'Cryptocurrency', 'Streaming', 'App Store',
      '3D Printer', 'Electric Car', 'Solar Panel', 'Fitness Tracker', 'Smart TV', 'Voice Assistant', 'Wireless Charger', 'Podcast', 'Emoji', 'QR Code'
    ]
  };

  useEffect(() => {
    let interval;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          if (newTime === 10 && soundEnabled) {
            // Would play warning sound here
          }
          if (newTime === 0 && soundEnabled) {
            // Would play end sound here
          }
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft, soundEnabled]);

  const startTimer = () => {
    setTimeLeft(customTimer);
    setTimerActive(true);
    setGameState('timer');
  };

  const startGame = () => {
    const categoryWords = categories[selectedCategory];
    let randomWord, randomSpy;
    
    // Avoid repeating recent words
    const recentWords = gameHistory.slice(-5).map(game => game.word);
    const availableWords = categoryWords.filter(word => !recentWords.includes(word));
    
    randomWord = availableWords.length > 0 
      ? availableWords[Math.floor(Math.random() * availableWords.length)]
      : categoryWords[Math.floor(Math.random() * categoryWords.length)];
    
    randomSpy = Math.floor(Math.random() * playerCount);
    
    setCurrentWord(randomWord);
    setSpyIndex(randomSpy);
    setCurrentPlayer(0);
    setPlayersReady(0);
    setShowingRole(false);
    setGameState('playing');
  };

  const nextPlayer = () => {
    if (currentPlayer < playerCount - 1) {
      setCurrentPlayer(currentPlayer + 1);
    } else {
      startTimer();
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
      spyIndex,
      playerCount,
      spyWon,
      timestamp: Date.now()
    };
    
    setGameHistory(prev => [...prev.slice(-9), gameResult]);
    setGameState('reveal');
  };

  const resetGame = () => {
    setGameState('home');
    setCurrentPlayer(0);
    setShowingRole(false);
    setPlayersReady(0);
    setTimerActive(false);
    setTimeLeft(customTimer);
    setSelectedCategory('');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isCurrentPlayerSpy = currentPlayer === spyIndex;

  // Settings overlay
  const SettingsOverlay = () => (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 border border-gray-600 rounded-2xl p-6 max-w-md w-full">
        <h3 className="text-xl font-bold text-white mb-4">Settings</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-white mb-2">Discussion Timer (seconds)</label>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCustomTimer(Math.max(30, customTimer - 15))}
                className="bg-red-700 hover:bg-red-600 px-3 py-1 rounded text-white"
              >
                -15s
              </button>
              <span className="text-white text-lg font-bold">{customTimer}s</span>
              <button 
                onClick={() => setCustomTimer(Math.min(300, customTimer + 15))}
                className="bg-red-700 hover:bg-red-600 px-3 py-1 rounded text-white"
              >
                +15s
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-white">Sound Effects</span>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-lg transition-colors ${soundEnabled ? 'bg-green-700' : 'bg-gray-700'}`}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5 text-white" /> : <VolumeX className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
        
        <button
          onClick={() => setShowStats(false)}
          className="w-full mt-6 bg-red-700 hover:bg-red-600 text-white py-2 px-4 rounded-xl"
        >
          Close
        </button>
      </div>
    </div>
  );

  // Home Screen
  if (gameState === 'home') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-600 to-red-800 rounded-full mb-6 shadow-2xl border-4 border-red-500/30">
              <Eye className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">MYSTERY WORD</h1>
            <p className="text-red-400 text-lg">Find the spy among you</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setGameState('categories')}
              className="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 shadow-xl border border-red-600/50 flex items-center justify-center space-x-3"
            >
              <Play className="w-6 h-6" />
              <span className="text-xl">START GAME</span>
            </button>
            
            <button
              onClick={() => setGameState('rules')}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 shadow-xl border border-gray-600/50 flex items-center justify-center space-x-3"
            >
              <BookOpen className="w-6 h-6" />
              <span className="text-xl">RULES</span>
            </button>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowStats(true)}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-xl transition-all border border-gray-600/50 text-center"
              >
                SETTINGS
              </button>
              
              {gameHistory.length > 0 && (
                <button
                  onClick={() => setGameState('history')}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-xl transition-all border border-gray-600/50 text-center"
                >
                  HISTORY ({gameHistory.length})
                </button>
              )}
            </div>
          </div>
        </div>
        
        {showStats && <SettingsOverlay />}
      </div>
    );
  }

  // Game History Screen
  if (gameState === 'history') {
    return (
      <div className="min-h-screen bg-black p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-8">
            <button
              onClick={() => setGameState('home')}
              className="bg-gray-800 hover:bg-gray-700 p-3 rounded-xl border border-gray-600/50 mr-4"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-3xl font-bold text-white">Game History</h1>
          </div>

          <div className="space-y-4">
            {gameHistory.slice().reverse().map((game, i) => (
              <div key={i} className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-white font-bold">{game.word}</span>
                    <span className="text-gray-400 ml-2">({game.category})</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(game.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-red-400">Player {game.spyIndex + 1} was the spy</span>
                  <span className={`text-sm px-2 py-1 rounded ${game.spyWon ? 'bg-red-900/30 text-red-300' : 'bg-green-900/30 text-green-300'}`}>
                    {game.spyWon ? 'Spy Won' : 'Others Won'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Rules Screen (enhanced)
  if (gameState === 'rules') {
    return (
      <div className="min-h-screen bg-black p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-8">
            <button
              onClick={() => setGameState('home')}
              className="bg-gray-800 hover:bg-gray-700 p-3 rounded-xl border border-gray-600/50 mr-4"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-3xl font-bold text-white">Game Rules</h1>
          </div>

          <div className="bg-gray-900/50 border border-gray-700/50 rounded-2xl p-8 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-red-400 mb-3">🎯 Objective</h2>
              <p className="text-gray-300">Find the spy among the players by listening to their descriptions!</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-red-400 mb-3">🎮 How to Play</h2>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li>One player is randomly chosen as the SPY</li>
                <li>All other players get the same secret word</li>
                <li>The spy only knows the category, not the word</li>
                <li>Players take turns describing the word without saying it</li>
                <li>The spy must try to blend in and guess the word</li>
                <li>Other players try to identify who the spy is</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-red-400 mb-3">💡 Pro Tips</h2>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li>Give specific but not obvious descriptions</li>
                <li>Watch for players giving vague or generic clues</li>
                <li>As the spy, listen for patterns in descriptions</li>
                <li>Don't be the first or last to give a clue as the spy</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-red-400 mb-3">⏱️ Game Flow</h2>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li>Each player secretly views their role</li>
                <li>Discussion timer starts (customizable)</li>
                <li>Players give descriptions in a circle</li>
                <li>Vote to identify the spy when time ends</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-red-400 mb-3">🏆 Winning</h2>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li><strong>Spy wins:</strong> If they guess the word correctly</li>
                <li><strong>Others win:</strong> If they correctly identify the spy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Categories Screen
  if (gameState === 'categories') {
    return (
      <div className="min-h-screen bg-black p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-8">
            <button
              onClick={() => setGameState('home')}
              className="bg-gray-800 hover:bg-gray-700 p-3 rounded-xl border border-gray-600/50 mr-4"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-3xl font-bold text-white">Choose Category</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(categories).map(([category, words]) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setGameState('players');
                }}
                className="bg-gray-900/50 hover:bg-red-900/30 border border-gray-700/50 hover:border-red-600/50 rounded-2xl p-6 transition-all transform hover:scale-105 text-left"
              >
                <h3 className="text-xl font-bold text-white mb-2">{category}</h3>
                <p className="text-gray-400 text-sm mb-3">{words.length} words available</p>
                <div className="flex flex-wrap gap-1">
                  {words.slice(0, 6).map((word, i) => (
                    <span key={i} className="bg-red-900/30 text-red-300 px-2 py-1 rounded-lg text-xs">
                      {word}
                    </span>
                  ))}
                  {words.length > 6 && (
                    <span className="text-gray-500 text-xs px-2 py-1">+{words.length - 6} more</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Players Screen
  if (gameState === 'players') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="flex items-center mb-8">
            <button
              onClick={() => setGameState('categories')}
              className="bg-gray-800 hover:bg-gray-700 p-3 rounded-xl border border-gray-600/50 mr-4"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">Players Setup</h1>
              <p className="text-red-400">Category: {selectedCategory}</p>
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-700/50 rounded-2xl p-8">
            <div className="mb-6">
              <label className="block text-white text-lg font-semibold mb-4 text-center">Timer Duration</label>
              <div className="flex items-center justify-center space-x-4 mb-6">
                <button 
                  onClick={() => setCustomTimer(Math.max(30, customTimer - 15))}
                  className="w-12 h-12 bg-red-700 hover:bg-red-600 border border-red-600 rounded-xl text-white text-lg font-bold"
                >
                  −
                </button>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{formatTime(customTimer)}</div>
                  <div className="text-gray-400 text-sm">discussion time</div>
                </div>
                <button 
                  onClick={() => setCustomTimer(Math.min(300, customTimer + 15))}
                  className="w-12 h-12 bg-red-700 hover:bg-red-600 border border-red-600 rounded-xl text-white text-lg font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-white text-lg font-semibold mb-6 text-center">Number of Players</label>
              <div className="flex items-center justify-center space-x-6">
                <button 
                  onClick={() => setPlayerCount(Math.max(3, playerCount - 1))}
                  className="w-14 h-14 bg-red-700 hover:bg-red-600 border border-red-600 rounded-xl text-white text-2xl font-bold transition-all"
                >
                  −
                </button>
                <div className="flex items-center space-x-3">
                  <Users className="w-8 h-8 text-red-400" />
                  <span className="text-4xl font-bold text-white w-16 text-center">{playerCount}</span>
                </div>
                <button 
                  onClick={() => setPlayerCount(Math.min(10, playerCount + 1))}
                  className="w-14 h-14 bg-red-700 hover:bg-red-600 border border-red-600 rounded-xl text-white text-2xl font-bold transition-all"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={startGame}
              className="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 shadow-xl border border-red-600/50 flex items-center justify-center space-x-3"
            >
              <Play className="w-6 h-6" />
              <span className="text-lg">START GAME</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Playing Screen
  if (gameState === 'playing') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Player {currentPlayer + 1}</h2>
            <p className="text-red-400 text-lg">Category: <span className="text-white font-semibold">{selectedCategory}</span></p>
            <div className="flex justify-center mt-4">
              <div className="flex space-x-2">
                {Array.from({ length: playerCount }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-4 h-4 rounded-full transition-all ${
                      i < currentPlayer 
                        ? 'bg-green-500' 
                        : i === currentPlayer 
                        ? 'bg-red-500 animate-pulse' 
                        : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-700/50 rounded-2xl p-8 shadow-2xl mb-6">
            {!showingRole ? (
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl border-4 border-red-500/30">
                  <EyeOff className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Ready to see your role?</h3>
                <p className="text-gray-400 mb-6">Make sure only you can see the screen</p>
                <button
                  onClick={showRole}
                  className="bg-red-700 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg border border-red-600/50"
                >
                  REVEAL MY ROLE
                </button>
              </div>
            ) : (
              <div className="text-center">
                {isCurrentPlayerSpy ? (
                  <>
                    <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-pulse border-4 border-red-500/50">
                      <Eye className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-4xl font-bold text-red-400 mb-4">YOU ARE THE SPY!</h3>
                    <div className="bg-red-900/30 border border-red-600/50 rounded-xl p-4 mb-6">
                      <p className="text-red-200 text-lg leading-relaxed">
                        Listen carefully and try to blend in!
                        <br />
                        Give vague descriptions that could fit any word in <span className="font-bold text-white">{selectedCategory}</span>
                        <br />
                        <span className="text-red-300">Try to guess the secret word!</span>
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-24 h-24 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl border-4 border-green-500/30">
                      <Users className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-green-400 mb-2">Your secret word is:</h3>
                    <h2 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                      {currentWord}
                    </h2>
                    <div className="bg-green-900/20 border border-green-600/50 rounded-xl p-4">
                      <p className="text-green-200 text-lg">
                        Describe it without saying the word!
                        <br />
                        <span className="text-green-300">Help others find the spy.</span>
                      </p>
                    </div>
                  </>
                )}
                
                <button
                  onClick={nextPlayer}
                  className="mt-8 bg-red-700 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg border border-red-600/50 text-lg"
                >
                  {currentPlayer < playerCount - 1 ? 'NEXT PLAYER' : 'START DISCUSSIONS'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Timer Screen
  if (gameState === 'timer') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="bg-gray-900/50 border border-gray-700/50 rounded-2xl p-12 shadow-2xl">
            <Clock className="w-20 h-20 text-red-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-8">Discussion Time</h2>
            
            <div className={`text-8xl font-bold mb-8 font-mono transition-colors duration-500 ${
              timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-red-400'
            }`}>
              {formatTime(timeLeft)}
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-4 mb-8">
              <p className="text-gray-300 text-lg">
                Take turns describing your word!
                <br />
                <span className="text-red-400">Find the spy among you.</span>
              </p>
            </div>

            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setTimerActive(!timerActive)}
                className="flex-1 bg-yellow-700 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center space-x-2"
              >
                {timerActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                <span>{timerActive ? 'PAUSE' : 'RESUME'}</span>
              </button>
              
              <button
                onClick={() => endGame()}
                className="flex-1 bg-red-700 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center space-x-2"
              >
                <SkipForward className="w-5 h-5" />
                <span>END EARLY</span>
              </button>
            </div>

            {timeLeft === 0 && (
              <button
                onClick={() => setGameState('reveal')}
                className="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg border border-red-600/50 text-lg animate-pulse"
              >
                REVEAL ANSWER
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Reveal Screen
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="bg-gray-900/50 border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-8">GAME OVER</h2>
          
          <div className="space-y-6 mb-8">
            <div className="bg-red-900/30 border border-red-600/50 rounded-xl p-6">
              <p className="text-xl text-white mb-2">Category: <span className="font-bold text-red-400">{selectedCategory}</span></p>
              <p className="text-2xl text-white mb-4">Secret Word: <span className="font-bold text-green-400">{currentWord}</span></p>
              <p className="text-xl text-white">The Spy: <span className="font-bold text-red-400">Player {spyIndex + 1}</span></p>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-4">
              <h3 className="text-lg font-bold text-white mb-3">Who won?</h3>
              <div className="flex space-x-3">
                <button
                  onClick={() => endGame(true)}
                  className="flex-1 bg-red-700 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-xl transition-all"
                >
                  SPY WON
                </button>
                <button
                  onClick={() => endGame(false)}
                  className="flex-1 bg-green-700 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl transition-all"
                >
                  OTHERS WON
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={startGame}
              className="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg border border-red-600/50 flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span className="text-lg">PLAY AGAIN</span>
            </button>
            
            <button
              onClick={resetGame}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-xl transition-all border border-gray-600/50 flex items-center justify-center space-x-2"
            >
              <Home className="w-5 h-5" />
              <span className="text-lg">MAIN MENU</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpyWordGame;