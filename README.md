# Sift React Native SDK Documentation

React Native wrapper for Sift [iOS](https://github.com/SiftScience/sift-ios) and [Android](https://github.com/SiftScience/sift-android) SDKs

## Table of Contents

1. [Overview](#overview)
2. [Getting Started](#getting-started-running-from-scratch)
3. [Usage Examples](#usage-examples)
4. [License](#license)
5. [Support](#support)

## Getting Started

This guide will help you set up and run the sift-react-native project from scratch, including the example app.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20.19.0+ (use [nvm](https://github.com/nvm-sh/nvm) or check `.nvmrc` file)
- **Yarn** 3.6.1+ (will be installed automatically via Corepack)
- **React Native development environment**:
  - For iOS: Xcode 14+, CocoaPods, and iOS Simulator
  - For Android: Android Studio, Android SDK, and Android Emulator
- **Watchman** (recommended for file watching)
- **Git**

### Step 1: Clone the Repository

```bash
git clone https://github.com/SiftScience/sift-react-native.git
cd sift-react-native
```

### Step 2: Install Dependencies

The project uses Yarn 3.6.1 with workspaces. Dependencies will be installed automatically:

```bash
# Enable Corepack (if not already enabled)
corepack enable

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

#### Install CocoaPods Dependencies

```bash
cd example/ios
bundle install  # Install Ruby dependencies (first time only)
bundle exec pod install
cd ../..
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

If needed, create `example/android/local.properties`:

```properties
sdk.dir=/path/to/your/android/sdk
```

Replace `/path/to/your/android/sdk` with your actual Android SDK path (typically `~/Library/Android/sdk` on macOS or `%LOCALAPPDATA%\Android\Sdk` on Windows).

#### Start Android Emulator

Start an Android emulator or connect a physical device:

```bash
# List available emulators
emulator -list-avds

# Start an emulator (replace with your AVD name)
emulator -avd YourAVDName
```

### Step 6: Run the Example App

#### Start Metro Bundler

In the root directory, start the Metro bundler:

```bash
# From root directory
yarn start:example
# or
cd example && yarn start
```

Keep this terminal running.

#### Run on iOS

In a new terminal:

```bash
# From root directory
yarn ios:example
# or
cd example && yarn ios
```

#### Run on Android

In a new terminal:

```bash
# From root directory
yarn android:example
# or
cd example && yarn android
```

### Step 7: Verify Installation

Once the app launches:

1. The example app should display a form with fields for:
   - Account ID
   - Beacon Key
   - User ID
   - Server URL Format

2. Fill in your Sift credentials and tap "UPLOAD" to test the integration.

### Development Workflow

#### Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test --watch
```

#### Linting

```bash
# Lint the codebase
yarn lint
```

#### Type Checking

```bash
# Type check TypeScript files
yarn typecheck
```

#### Clean Build

```bash
# Clean all build artifacts
yarn clean
```

### Troubleshooting

#### Metro Bundler Issues

If you encounter module resolution errors:

```bash
# Clear Metro cache
yarn start:example --reset-cache
```

#### iOS Build Issues

```bash
# Clean and reinstall pods
cd example/ios
rm -rf Pods Podfile.lock
bundle exec pod install
cd ../..
```

#### Android Build Issues

```bash
# Clean Android build
cd example/android
./gradlew clean
cd ../..
```

#### Yarn Workspace Issues

If you encounter workspace linking issues:

```bash
# Remove node_modules and reinstall
rm -rf node_modules example/node_modules
yarn install
```

### Project Structure

```
sift-react-native/
├── src/                    # TypeScript source code
├── lib/                    # Compiled output (generated)
├── ios/                    # iOS native implementation
├── android/                # Android native implementation
├── example/                # Example React Native app
│   ├── src/               # Example app source
│   ├── ios/               # iOS example app
│   └── android/           # Android example app
├── package.json           # Root package configuration
└── yarn.lock             # Dependency lock file
```


## Usage Examples

### Basic Integration

```typescript
import React, { useEffect } from 'react';
import SiftReactNative from 'sift-react-native';

const App = () => {
  useEffect(() => {
    // Initialize Sift when app starts
    SiftReactNative.setSiftConfig(
      'your-account-id',
      'your-beacon-key',
      false, // Allow location collection
      'https://api3.siftscience.com/v3/accounts/%s/mobile_events'
    );
  }, []);

  const handleUserLogin = (userId: string) => {
    SiftReactNative.setUserId(userId);
    SiftReactNative.upload();
  };

  const handleUserLogout = () => {
    SiftReactNative.unsetUserId();
  };

  return (
    // Your app components
  );
};
```

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

For technical support and questions:

- **Documentation**: [Sift Developer Docs](https://developers.sift.com)
- **Issues**: [GitHub Issues](https://github.com/SiftScience/sift-react-native/issues)
- **Email**: support@sift.com

---

Made with ❤️ by the Sift team
