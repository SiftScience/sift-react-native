# Sift React Native SDK - Example App

This is an example React Native app demonstrating the integration of the Sift React Native SDK.

## Why This Example App?

The example app serves multiple purposes:

1. **Testing & Development**: Provides a working React Native environment to test the SDK's native modules (iOS and Android) during development
2. **Integration Demo**: Shows developers how to integrate the SDK into their own React Native apps
3. **Debugging**: Allows contributors to debug native code and test changes before publishing
4. **Documentation**: Serves as living documentation of SDK usage patterns

The example app is set up as a workspace package, allowing it to use the local development version of the SDK rather than the published npm package.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Running the Example App](#running-the-example-app)
3. [Development Workflow](#development-workflow)
4. [Troubleshooting](#troubleshooting)
5. [Project Structure](#project-structure)

## Getting Started

This guide will help you set up and run the sift-react-native example app from scratch.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20.19.0+ (use [nvm](https://github.com/nvm-sh/nvm) or check `.nvmrc` file)
- **Yarn** 3.6.1+ (will be installed automatically via Corepack)
- **React Native development environment**:
  - For iOS: Xcode 16.1+, CocoaPods, and iOS Simulator
  - For Android: Android Studio, Android SDK, and Android Emulator
- **Watchman** (recommended for file watching)
- **Git**
- **Homebrew** (macOS only, for installing rbenv and other dependencies)

For detailed React Native environment setup, see the [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment) guide.

### Step 1: Clone the Repository

```bash
git clone https://github.com/SiftScience/sift-react-native.git
cd sift-react-native
```

### Step 2: Install Dependencies

The project uses Yarn 3.6.1 with workspaces. Dependencies will be installed automatically:

```bash
# Install all dependencies (root + example app)
yarn install
```

This will:
- Install root project dependencies
- Install example app dependencies
- Link the workspace packages

### Step 3: Build the Library

Build the TypeScript source code and generate type definitions:

```bash
# Build the library
yarn prepare
# or
npx react-native-builder-bob build
```

This creates the `lib/` directory with compiled JavaScript and TypeScript definitions.

### Step 4: Set Up iOS (macOS only)

#### Install Ruby Version Manager (First Time Setup)

If you don't have a Ruby version manager installed, install `rbenv`:

```bash
# Install rbenv using Homebrew
brew install rbenv

# Initialize rbenv in your shell
rbenv init

# Install Ruby (check .ruby-version file for required version)
rbenv install
```

After installation, restart your terminal or run `source ~/.zshrc` (or `~/.bash_profile` for bash).

#### Install CocoaPods Dependencies

```bash
cd ios
bundle install  # Install Ruby dependencies including CocoaPods
bundle exec pod install
cd ..
```

#### Configure iOS Simulator

Make sure you have an iOS Simulator available. You can list available simulators:

```bash
xcrun simctl list devices
```

### Step 5: Set Up Android

#### Configure Android SDK

Ensure your Android SDK is properly configured. The example app will use the SDK path from your environment or `ANDROID_HOME` variable.

#### Create/Update local.properties

If needed, create `android/local.properties`:

```properties
sdk.dir=/path/to/your/android/sdk
```

Replace `/path/to/your/android/sdk` with your actual Android SDK path:
- macOS: typically `~/Library/Android/sdk`
- Windows: typically `%LOCALAPPDATA%\Android\Sdk`
- Linux: typically `~/Android/Sdk`

#### Start Android Emulator

Start an Android emulator or connect a physical device:

```bash
# List available emulators
emulator -list-avds

# Start an emulator (replace with your AVD name)
emulator -avd YourAVDName
```

## Running the Example App

### Start Metro Bundler

In the example directory, start the Metro bundler:

```bash
# Using npm
npm start

# OR using Yarn
yarn start

# OR from root directory
yarn start:example
```

Keep this terminal running.

### Run on iOS

In a new terminal:

```bash
# From example directory
yarn ios

# OR from root directory
yarn ios:example
```

### Run on Android

In a new terminal:

```bash
# From example directory
yarn android

# OR from root directory
yarn android:example
```

If everything is set up correctly, you should see the app running in the Android Emulator, iOS Simulator, or your connected device.

### Using the Example App

Once the app launches:

1. The example app displays a form with fields for:
   - **Account ID**: Your Sift account ID
   - **Beacon Key**: Your Sift beacon key
   - **User ID**: A test user identifier
   - **Server URL Format**: The Sift API endpoint URL

2. Fill in your Sift credentials and tap **"UPLOAD"** to test the integration.

3. The app will initialize the Sift SDK and upload device data.

## Development Workflow

### Modifying the Example App

Open `App.tsx` in your text editor and make changes. The app will automatically reload thanks to [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

To manually reload:
- **Android**: Press <kbd>R</kbd> twice or <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) / <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS) to open Dev Menu
- **iOS**: Press <kbd>R</kbd> in iOS Simulator

### Modifying the SDK

If you make changes to the SDK source code in the parent directory:

1. Rebuild the library:
   ```bash
   cd ..
   yarn prepare
   cd example
   ```

2. Restart Metro bundler with cache reset:
   ```bash
   yarn start --reset-cache
   ```

### Running Tests

From the root directory:

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test --watch
```

### Linting

```bash
# Lint the codebase
yarn lint
```

### Type Checking

```bash
# Type check TypeScript files
yarn typecheck
```

### Clean Build

```bash
# Clean all build artifacts
yarn clean
```

## Troubleshooting

### Metro Bundler Issues

If you encounter module resolution errors:

```bash
# Clear Metro cache
yarn start --reset-cache
```

### iOS Build Issues

```bash
# Clean and reinstall pods
cd ios
rm -rf Pods Podfile.lock
bundle exec pod install
cd ..
```

If you still have issues, try cleaning the Xcode build folder:
- Open the project in Xcode
- Go to Product > Clean Build Folder (Shift + Cmd + K)

### Android Build Issues

```bash
# Clean Android build
cd android
./gradlew clean
cd ..
```

If you encounter Gradle issues:
```bash
# Stop Gradle daemon
cd android
./gradlew --stop
cd ..
```

### Yarn Workspace Issues

If you encounter workspace linking issues:

```bash
# From root directory
rm -rf node_modules example/node_modules
yarn install
```

### Common Issues

**Issue**: "Command not found" errors
- Make sure you've run `yarn install` in the root directory
- Ensure Corepack is enabled: `corepack enable`

**Issue**: Module not found errors
- Rebuild the library: `yarn prepare` from root directory
- Clear Metro cache: `yarn start --reset-cache`

**Issue**: Native module errors
- iOS: Reinstall pods (see iOS Build Issues above)
- Android: Clean and rebuild (see Android Build Issues above)

For more troubleshooting help, see the [React Native Troubleshooting](https://reactnative.dev/docs/troubleshooting) guide.

## Project Structure

```
example/
├── src/                    # Example app source code
│   └── App.tsx            # Main app component
├── ios/                    # iOS native app
│   ├── Podfile            # CocoaPods dependencies
│   └── SiftReactNativeExample.xcworkspace
├── android/                # Android native app
│   ├── app/
│   └── build.gradle
├── package.json           # Example app dependencies
└── README.md             # This file
```

## Learn More

To learn more about React Native and Sift, check out these resources:

- **Sift Documentation**: [Sift Developer Docs](https://developers.sift.com)
- **React Native**: [React Native Website](https://reactnative.dev)
- **React Native Basics**: [Learn the Basics](https://reactnative.dev/docs/getting-started)
- **Main SDK Documentation**: See [../README.md](../README.md) for SDK usage and API reference
