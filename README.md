# Mystery Word Game 🕵️

A fun social deduction game where players try to find the spies among them!

## 🎮 How to Play

1. **Setup**: Choose a category and number of players (3-10)
2. **Spy Selection**: Set how many spies you want (1 to half the players)
3. **Role Assignment**: Each player secretly views their role
4. **Discussion**: Players take turns describing the secret word
5. **Detection**: Find the spies before time runs out!

## 🎯 Game Rules

- **Regular Players**: Get a secret word and must describe it without saying it
- **Spies**: Only know the category and must try to blend in
- **Win Conditions**: 
  - Spies win if they guess the word correctly
  - Others win if they identify all the spies

## 📁 File Structure

```
├── gameData.js          # Categories and utility functions
├── gameUtils.js         # Game logic (word/spy selection)
├── gameHooks.js         # Custom React hooks
├── SettingsOverlay.jsx  # Settings component
├── CategoryScreen.jsx   # Category selection
├── GameScreens.jsx      # All game screen components
└── SpyWordGame.jsx      # Main game component
```

## ⚡ Features

- **8 Categories**: Animals, Food, Movies, Places, Sports, Objects, Professions, Technology
- **Multiple Spies**: Support for 1 to half the players as spies
- **Customizable Timer**: 30 seconds to 5 minutes discussion time
- **Game History**: Track previous games and results
- **Sound Controls**: Toggle sound effects on/off
- **Mobile Friendly**: Responsive design for all devices

## 🚀 Setup

1. Import all the component files
2. Make sure you have React and lucide-react installed
3. Import and use the main `SpyWordGame` component

## 🎨 Categories Available

- **Animals** (30 words)
- **Food** (30 words) 
- **Movies** (30 words)
- **Places** (30 words)
- **Sports** (30 words)
- **Objects** (30 words)
- **Professions** (30 words)
- **Technology** (30 words)

## 🔧 Dependencies

- React (with hooks)
- lucide-react (for icons)

---

Have fun finding the spies! 🎭