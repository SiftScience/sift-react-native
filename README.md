# Sift React Native SDK

React Native wrapper for Sift [iOS](https://github.com/SiftScience/sift-ios) and [Android](https://github.com/SiftScience/sift-android) SDKs

## Table of Contents

1. [Requirements](#requirements)
2. [Installation](#installation)
3. [Usage](#usage)
4. [API Reference](#api-reference)
5. [Example App](#example-app)
6. [License](#license)
7. [Support](#support)

## Requirements

- **Node.js**: 22.0.0 or higher
- **React Native**: 0.60.0 or higher
- **React**: 16.8.0 or higher

### iOS
- **iOS**: 13.4 or higher
- **CocoaPods**: Latest version recommended

### Android
- **Android SDK**: API level 24 (Android 7.0) or higher
- **Kotlin**: 1.6.0 or higher
- **Java**: 8 or higher

## Installation

```bash
# Using npm
npm install sift-react-native

# OR using Yarn
yarn add sift-react-native
```

### iOS Setup

Add the Sift pod to your `ios/Podfile`:

```ruby
pod 'Sift'
```

Then install CocoaPods dependencies:

```bash
cd ios
pod install
cd ..
```

### Android Setup

No additional setup required. The Android SDK will be automatically linked.

## Usage

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

## API Reference

### setSiftConfig(accountId, beaconKey, disallowLocationCollection, serverUrlFormat)

Initializes the Sift SDK with your credentials.

**Parameters:**
- `accountId` (string): Your Sift account ID
- `beaconKey` (string): Your Sift beacon key
- `disallowLocationCollection` (boolean): Set to `true` to disable location collection
- `serverUrlFormat` (string): Server URL format (default: `'https://api3.siftscience.com/v3/accounts/%s/mobile_events'`)

### setUserId(userId)

Sets the user ID for tracking.

**Parameters:**
- `userId` (string): The user identifier

### unsetUserId()

Clears the current user ID. Call this when a user logs out.

### upload()

Manually uploads collected data to Sift. The SDK automatically uploads data periodically, but you can call this method to force an immediate upload.

## Example App

To see the SDK in action, check out the example app in the [example/](example/) directory. See the [example/README.md](example/README.md) for setup and running instructions.

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

For technical support and questions:

- **Documentation**: [Sift Developer Docs](https://developers.sift.com)
- **Issues**: [GitHub Issues](https://github.com/SiftScience/sift-react-native/issues)
- **Email**: support@sift.com
