# Sift React Native SDK Documentation

A comprehensive React Native wrapper for Sift iOS and Android SDKs, enabling fraud prevention and digital trust & safety in your mobile applications.

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Platform Setup](#platform-setup)
4. [API Reference](#api-reference)
5. [Usage Examples](#usage-examples)
6. [Configuration](#configuration)
7. [Troubleshooting](#troubleshooting)
8. [Contributing](#contributing)

## Overview

Sift is the leader in Digital Trust & Safety, empowering organizations of all sizes to unlock new revenue without risk using machine learning. This React Native SDK provides a unified interface to integrate Sift's fraud prevention capabilities across both iOS and Android platforms.

## Installation

### Prerequisites

- React Native 0.60+
- iOS 11.0+ (for iOS)
- Android API 21+ (for Android)
- Node.js 20+

### Install the Package

```bash
npm install sift-react-native
# or
yarn add sift-react-native
```

### iOS Setup

#### 1. Add Sift Pod to Podfile

Add the Sift pod to your `ios/Podfile`:

```ruby
target 'YourAppName' do
  # ... other pods
  pod 'Sift'
end
```

#### 2. Install CocoaPods Dependencies

Navigate to your iOS directory and install pods:

```bash
cd ios
pod install
```

### Android Setup

#### 1. Add Sift Dependency

The Android dependency is automatically included via the module's `build.gradle`:

```gradle
dependencies {
    implementation "com.siftscience:sift-android:1.3.0"
}
```

## Platform Setup

### React Native Configuration

#### 1. Import the Module

```typescript
import SiftReactNative from 'sift-react-native';
```

#### 2. Initialize Sift

Configure Sift with your account credentials:

```typescript
// Basic configuration
SiftReactNative.setSiftConfig(
  'your-account-id',           // Account ID from Sift Console
  'your-beacon-key',          // Beacon Key from Sift Console
  true,                       // Disallow location collection (optional)
  'https://api3.siftscience.com/v3/accounts/%s/mobile_events' // Server URL format
);
```

#### 3. Set User Context

```typescript
// Set user ID for tracking
SiftReactNative.setUserId('user-123');

// Clear user ID when user logs out
SiftReactNative.unsetUserId();
```

## API Reference

### Methods

#### `setSiftConfig(accountId, beaconKey, disallowCollectingLocationData, serverUrlFormat)`

Initializes the Sift SDK with your account configuration.

**Parameters:**
- `accountId` (string): Your Sift account ID
- `beaconKey` (string): Your Sift beacon key
- `disallowCollectingLocationData` (boolean): Whether to disable location collection
- `serverUrlFormat` (string): Custom server URL format (optional)

**Example:**
```typescript
SiftReactNative.setSiftConfig(
  'your-account-id',
  'your-beacon-key',
  false, // Allow location collection
  'https://api3.siftscience.com/v3/accounts/%s/mobile_events'
);
```

#### `setUserId(userId)`

Associates the current session with a specific user ID.

**Parameters:**
- `userId` (string): Unique identifier for the user

**Example:**
```typescript
SiftReactNative.setUserId('user-12345');
```

#### `unsetUserId()`

Removes the user ID association from the current session.

**Example:**
```typescript
SiftReactNative.unsetUserId();
```

#### `upload()`

Manually triggers data upload to Sift servers.

**Example:**
```typescript
SiftReactNative.upload();
```

#### `onHostResume()`

Call this method when your app resumes from background.

**Example:**
```typescript
SiftReactNative.onHostResume();
```

#### `onHostPause()`

Call this method when your app goes to background.

**Example:**
```typescript
SiftReactNative.onHostPause();
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
