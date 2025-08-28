import React from 'react';
import { 
  Users, Play, RotateCcw, Eye, EyeOff, Clock, Home, BookOpen, 
  ArrowLeft, Pause, SkipForward 
} from 'lucide-react';
import { formatTime } from './gameData.js';
import { isPlayerSpy, getMaxSpies } from './gameUtils.js';

// Home Screen Component
export const HomeScreen = ({ onStartGame, onViewRules, onShowSettings, onShowHistory, gameHistory }) => (
  <div className="min-h-screen bg-black flex items-center justify-center p-4">
    <div className="w-full max-w-md">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-600 to-red-800 rounded-full mb-6 shadow-2xl border-4 border-red-500/30">
          <Eye className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">MYSTERY WORD</h1>
        <p className="text-red-400 text-lg">Find the spies among you</p>
      </div>

      <div className="space-y-4">
        <button
          onClick={onStartGame}
          className="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 shadow-xl border border-red-600/50 flex items-center justify-center space-x-3"
        >
          <Play className="w-6 h-6" />
          <span className="text-xl">START GAME</span>
        </button>
        
        <button
          onClick={onViewRules}
          className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 shadow-xl border border-gray-600/50 flex items-center justify-center space-x-3"
        >
          <BookOpen className="w-6 h-6" />
          <span className="text-xl">RULES</span>
        </button>

        <div className="flex space-x-4">
          <button
            onClick={onShowSettings}
            className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-xl transition-all border border-gray-600/50 text-center"
          >
            SETTINGS
          </button>
          
          {gameHistory.length > 0 && (
            <button
              onClick={onShowHistory}
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-xl transition-all border border-gray-600/50 text-center"
            >
              HISTORY ({gameHistory.length})
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
);

// Rules Screen Component
export const RulesScreen = ({ onBack }) => (
  <div className="min-h-screen bg-black p-4">
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center mb-8">
        <button
          onClick={onBack}
          className="bg-gray-800 hover:bg-gray-700 p-3 rounded-xl border border-gray-600/50 mr-4"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-3xl font-bold text-white">Game Rules</h1>
      </div>

      <div className="bg-gray-900/50 border border-gray-700/50 rounded-2xl p-8 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-red-400 mb-3">🎯 Objective</h2>
          <p className="text-gray-300">Find the spies among the players by listening to their descriptions!</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-red-400 mb-3">🎮 How to Play</h2>
          <ul className="text-gray-300 space-y-2 list-disc list-inside">
            <li>One or more players are randomly chosen as SPIES</li>
            <li>All other players get the same secret word</li>
            <li>The spies only know the category, not the word</li>
            <li>Players take turns describing the word without saying it</li>
            <li>The spies must try to blend in and guess the word</li>
            <li>Other players try to identify who the spies are</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-red-400 mb-3">💡 Pro Tips</h2>
          <ul className="text-gray-300 space-y-2 list-disc list-inside">
            <li>Give specific but not obvious descriptions</li>
            <li>Watch for players giving vague or generic clues</li>
            <li>As a spy, listen for patterns in descriptions</li>
            <li>Don't be the first or last to give a clue as a spy</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-red-400 mb-3">⏱️ Game Flow</h2>
          <ul className="text-gray-300 space-y-2 list-disc list-inside">
            <li>Each player secretly views their role</li>
            <li>Discussion timer starts (customizable)</li>
            <li>Players give descriptions in a circle</li>
            <li>Vote to identify the spies when time ends</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-red-400 mb-3">🏆 Winning</h2>
          <ul className="text-gray-300 space-y-2 list-disc list-inside">
            <li><strong>Spies win:</strong> If they guess the word correctly</li>
            <li><strong>Others win:</strong> If they correctly identify all spies</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// History Screen Component
export const HistoryScreen = ({ gameHistory, onBack }) => (
  <div className="min-h-screen bg-black p-4">
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center mb-8">
        <button
          onClick={onBack}
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
              <span className="text-red-400">
                {game.spyIndices.length === 1 
                  ? `Player ${game.spyIndices[0] + 1} was the spy`
                  : `Players ${game.spyIndices.map(i => i + 1).join(', ')} were the spies`
                }
              </span>
              <span className={`text-sm px-2 py-1 rounded ${game.spyWon ? 'bg-red-900/30 text-red-300' : 'bg-green-900/30 text-green-300'}`}>
                {game.spyWon ? 'Spies Won' : 'Others Won'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Players Setup Screen Component
export const PlayersScreen = ({ 
  selectedCategory, 
  playerCount, 
  setPlayerCount, 
  spyCount,
  setSpyCount,
  customTimer, 
  setCustomTimer, 
  onStartGame, 
  onBack 
}) => (
  <div className="min-h-screen bg-black flex items-center justify-center p-4">
    <div className="w-full max-w-md">
      <div className="flex items-center mb-8">
        <button
          onClick={onBack}
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

        <div className="mb-8">
          <label className="block text-white text-lg font-semibold mb-6 text-center">Number of Spies</label>
          <div className="flex items-center justify-center space-x-6">
            <button 
              onClick={() => setSpyCount(Math.max(1, spyCount - 1))}
              className="w-14 h-14 bg-orange-700 hover:bg-orange-600 border border-orange-600 rounded-xl text-white text-2xl font-bold transition-all"
            >
              −
            </button>
            <div className="flex items-center space-x-3">
              <Eye className="w-8 h-8 text-orange-400" />
              <span className="text-4xl font-bold text-white w-16 text-center">{spyCount}</span>
            </div>
            <button 
              onClick={() => setSpyCount(Math.min(getMaxSpies(playerCount), spyCount + 1))}
              className="w-14 h-14 bg-orange-700 hover:bg-orange-600 border border-orange-600 rounded-xl text-white text-2xl font-bold transition-all"
            >
              +
            </button>
          </div>
          <p className="text-center text-gray-400 text-sm mt-2">
            Max: {getMaxSpies(playerCount)} spies
          </p>
        </div>

        <button
          onClick={onStartGame}
          className="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 shadow-xl border border-red-600/50 flex items-center justify-center space-x-3"
        >
          <Play className="w-6 h-6" />
          <span className="text-lg">START GAME</span>
        </button>
      </div>
    </div>
  </div>
);

// Playing Screen Component
export const PlayingScreen = ({ 
  currentPlayer, 
  playerCount, 
  selectedCategory, 
  currentWord, 
  spyIndices,
  showingRole, 
  onShowRole, 
  onNextPlayer 
}) => {
  const isCurrentPlayerSpy = isPlayerSpy(currentPlayer, spyIndices);

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
                onClick={onShowRole}
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
                  <h3 className="text-4xl font-bold text-red-400 mb-4">YOU ARE A SPY!</h3>
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
                      <span className="text-green-300">Help others find the spies.</span>
                    </p>
                  </div>
                </>
              )}
              
              <button
                onClick={onNextPlayer}
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
};

// Timer Screen Component
export const TimerScreen = ({ 
  timeLeft, 
  timerActive, 
  setTimerActive, 
  onEndGame, 
  onRevealAnswer 
}) => (
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
            <span className="text-red-400">Find the spies among you.</span>
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
            onClick={onEndGame}
            className="flex-1 bg-red-700 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center space-x-2"
          >
            <SkipForward className="w-5 h-5" />
            <span>END EARLY</span>
          </button>
        </div>

        {timeLeft === 0 && (
          <button
            onClick={onRevealAnswer}
            className="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg border border-red-600/50 text-lg animate-pulse"
          >
            REVEAL ANSWER
          </button>
        )}
      </div>
    </div>
  </div>
);

// Reveal Screen Component
export const RevealScreen = ({ 
  selectedCategory, 
  currentWord, 
  spyIndices,
  onSpyWon, 
  onOthersWon, 
  onPlayAgain, 
  onMainMenu 
}) => (
  <div className="min-h-screen bg-black flex items-center justify-center p-4">
    <div className="w-full max-w-md text-center">
      <div className="bg-gray-900/50 border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-4xl font-bold text-white mb-8">GAME OVER</h2>
        
        <div className="space-y-6 mb-8">
          <div className="bg-red-900/30 border border-red-600/50 rounded-xl p-6">
            <p className="text-xl text-white mb-2">Category: <span className="font-bold text-red-400">{selectedCategory}</span></p>
            <p className="text-2xl text-white mb-4">Secret Word: <span className="font-bold text-green-400">{currentWord}</span></p>
            <p className="text-xl text-white">
              {spyIndices.length === 1 
                ? <>The Spy: <span className="font-bold text-red-400">Player {spyIndices[0] + 1}</span></>
                : <>The Spies: <span className="font-bold text-red-400">Players {spyIndices.map(i => i + 1).join(', ')}</span></>
              }
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-4">
            <h3 className="text-lg font-bold text-white mb-3">Who won?</h3>
            <div className="flex space-x-3">
              <button
                onClick={onSpyWon}
                className="flex-1 bg-red-700 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-xl transition-all"
              >
                {spyIndices.length === 1 ? 'SPY WON' : 'SPIES WON'}
              </button>
              <button
                onClick={onOthersWon}
                className="flex-1 bg-green-700 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl transition-all"
              >
                OTHERS WON
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onPlayAgain}
            className="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg border border-red-600/50 flex items-center justify-center space-x-2"
          >
            <RotateCcw className="w-5 h-5" />
            <span className="text-lg">PLAY AGAIN</span>
          </button>
          
          <button
            onClick={onMainMenu}
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