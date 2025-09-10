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

export const selectSpies = (playerCount, spyCount, gameHistory = []) => {
  // Ensure we don't have more spies than players
  const maxSpies = Math.max(1, Math.floor(playerCount / 2));
  const actualSpyCount = Math.min(spyCount, maxSpies);
  
  // Get recent spy indices from last few games to avoid repetition
  const recentSpyIndices = gameHistory
    .slice(-3) // Look at last 3 games
    .flatMap(game => game.spyIndices || [game.spyIndex]) // Handle both old and new format
    .filter(index => index !== undefined && index < playerCount); // Only valid indices for current player count
  
  // Create array of all possible player indices
  const allIndices = Array.from({ length: playerCount }, (_, i) => i);
  
  // Filter out recent spies if we have enough alternatives
  let availableIndices = allIndices.filter(index => !recentSpyIndices.includes(index));
  
  // If we filtered out too many players, 
  if (availableIndices.length < actualSpyCount) {
    availableIndices = [...allIndices];
  }
  
  // Use Fisher-Yates shuffle for truly random selection
  const shuffled = [...availableIndices];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // Select the required number of spies
  const spyIndices = shuffled.slice(0, actualSpyCount);
  
  return spyIndices.sort((a, b) => a - b); // Return sorted for consistency
};

export const isPlayerSpy = (playerIndex, spyIndices) => {
  return spyIndices.includes(playerIndex);
};

export const getMaxSpies = (playerCount) => {
  return Math.max(1, Math.floor(playerCount / 2));
};