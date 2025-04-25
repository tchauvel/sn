# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

# Snap & Cook

Snap & Cook is a mobile application that helps you discover recipes based on the ingredients you have. Simply take a photo of your ingredients, and the app will provide you with matching recipes.

## Features

- **Ingredient Detection**: Take a photo of your ingredients to automatically identify them
- **Intelligent Recipe Matching**: Get recipes that best match your available ingredients 
- **Match Scoring**: See how well each recipe matches your ingredients with a percentage score
- **Recipe Details**: View detailed instructions, preparation times, and ingredient lists
- **Refreshable Content**: Find new recipes without seeing duplicates
- **Web and Mobile Support**: Run on iOS, Android, or in a web browser

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/snap-and-cook.git
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

## Running the App

After starting the app with `npx expo start`, you have several options:

- **Web Browser**: Press `w` to open in a web browser
- **iOS Simulator**: Press `i` to open in iOS simulator (requires Xcode on Mac)
- **Android Emulator**: Press `a` to open in Android emulator (requires Android Studio)
- **Physical Device**: Scan the QR code with the Expo Go app on your phone
- **Expo Go mode**: Press `s` to switch to Expo Go mode for better compatibility

## How to Use

1. **Start the app** and take a photo of your ingredients (or use the simulation feature)
2. **Review the detected ingredients** and add or remove items as needed
3. **Find recipes** based on your ingredients
4. **Explore each recipe** to see details, instructions, and which of your ingredients match
5. **Refresh** to see new recipe options

## Technologies Used

- **React Native**: For cross-platform mobile development
- **Expo**: For easy deployment and testing
- **Expo Router**: For navigation and routing

## Project Structure

- `app/index.tsx`: Home screen with camera functionality
- `app/ingredients.tsx`: Ingredients management screen
- `app/recipes.tsx`: Recipe list screen with matching algorithm
- `app/recipe/[id].tsx`: Recipe detail screen
- `assets/`: Images and other static assets

## Demo Mode

The app currently runs in demo mode, which simulates ingredient detection. In a production environment, this would be connected to a computer vision API.

## Troubleshooting

- If you encounter issues starting the app, try running `npx expo start --clear` to clear the cache
- Make sure you have the latest version of Node.js and npm installed
- For iOS simulator issues, ensure Xcode is up to date
- For Android emulator issues, verify Android Studio is properly configured

## License

MIT

## Author

[Your Name]
