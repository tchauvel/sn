# 📸 Snap & Cook

<div align="center">
  <img src="assets/images/splash-icon.png" alt="Snap & Cook Logo" width="120"/>
  <h3>Find delicious recipes with ingredients you already have!</h3>
</div>

## 🌟 About

Snap & Cook makes cooking easy by helping you discover recipes based on ingredients you already have in your kitchen. Take a photo of your ingredients, and our smart matching algorithm will find the perfect recipes for you!

## ✨ Features

- 📷 **One-click ingredient detection** - Just take a photo of your ingredients
- 🍳 **Smart recipe matching** - Finds recipes that best use your ingredients
- 📊 **Match scoring** - Shows how well each recipe matches your available ingredients
- 🔄 **Fresh suggestions** - Never see the same recipe twice when refreshing
- 📱 **Cross-platform** - Works on iOS, Android, and web browsers

## 📱 Screenshots

[Screenshots could be added here]

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or newer)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo Go](https://expo.dev/client) app (for testing on physical devices)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/tchauvel/sn.git snap-and-cook
   cd snap-and-cook
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the app:
   ```bash
   npx expo start
   ```

4. Choose how to run the app:
   - **On your phone**: Scan the QR code with the Expo Go app
   - **iOS simulator**: Press `i` in the terminal
   - **Android emulator**: Press `a` in the terminal
   - **Web browser**: Press `w` in the terminal

## 🍽️ How to Use

1. **Launch the app** - You'll start at the camera screen
2. **Take a photo** of your ingredients (or use the demo mode)
3. **Review ingredients** - Edit the detected ingredients if needed
4. **Browse recipes** - See recipes that match your ingredients
5. **Check details** - Tap on a recipe to see instructions and ingredients
6. **Refresh** - Pull down to see new recipe suggestions

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| App not starting | Try `npx expo start --clear` to clear cache |
| Camera not working | Make sure you've granted camera permissions |
| Recipes not loading | Check your internet connection |
| Expo Go issues | Try pressing `s` to switch between development modes |

## 💻 Development

### Project Structure

```
snap-and-cook/
├── app/                # Main application screens
│   ├── index.tsx       # Home/Camera screen
│   ├── ingredients.tsx # Ingredient management
│   ├── recipes.tsx     # Recipe list with matching
│   └── recipe/[id].tsx # Recipe details
├── services/           # Business logic
│   ├── recipeService.ts   # Recipe matching algorithm
│   └── recipeDatabase.ts  # Recipe data
└── assets/             # Images and static files
```

### Recipe Matching Algorithm

Our intelligent recipe matching provides:

- Partial word matching for ingredients
- Percentage-based match scoring
- Prioritization of recipes with the highest matches
- "Memory" to avoid showing the same recipes repeatedly

## 📝 License

MIT

---

<div align="center">
  <p>Made with ❤️ by Snap & Cook Team</p>
</div>
