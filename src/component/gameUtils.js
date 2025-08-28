import { categories } from './gameData.js';

export const selectRandomWord = (category, gameHistory) => {
  const categoryWords = categories[category];
  
  // Avoid repeating recent words
  const recentWords = gameHistory.slice(-5).map(game => game.word);
  const availableWords = categoryWords.filter(word => !recentWords.includes(word));
  
  return availableWords.length > 0 
    ? availableWords[Math.floor(Math.random() * availableWords.length)]
    : categoryWords[Math.floor(Math.random() * categoryWords.length)];
};

export const selectSpies = (playerCount, spyCount) => {
  // Ensure we don't have more spies than players
  const maxSpies = Math.max(1, Math.floor(playerCount / 2));
  const actualSpyCount = Math.min(spyCount, maxSpies);
  
  const spyIndices = [];
  const availableIndices = Array.from({ length: playerCount }, (_, i) => i);
  
  // Shuffle the array to allow first player to be spy
  for (let i = availableIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [availableIndices[i], availableIndices[j]] = [availableIndices[j], availableIndices[i]];
  }
  
  // Select the required number of spies
  for (let i = 0; i < actualSpyCount; i++) {
    spyIndices.push(availableIndices[i]);
  }
  
  return spyIndices.sort((a, b) => a - b); // Return sorted for consistency
};

export const isPlayerSpy = (playerIndex, spyIndices) => {
  return spyIndices.includes(playerIndex);
};

export const getMaxSpies = (playerCount) => {
  return Math.max(1, Math.floor(playerCount / 2));
};