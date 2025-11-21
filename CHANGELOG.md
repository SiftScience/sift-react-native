# Change Log

## [1.0.0] - 2025-10-20

### Added
- Support for React Native 0.81.1
- Support for React 19.1.0
- Yarn 3.6.1 (Berry) with Plug'n'Play support
- Turbo for monorepo build orchestration
- Lefthook for git hooks management
- TypeScript 5.9.2 support
- ESLint 9.x with flat config format
- Modern ESM package exports
- PrivacyInfo.xcprivacy for iOS App Store compliance
- CODE_OF_CONDUCT.md and CONTRIBUTING.md documentation

### Changed
- **BREAKING**: Migrated from React Native 0.62.2 to 0.81.1
- **BREAKING**: Migrated from React 16.11.0 to 19.1.0
- **BREAKING**: Migrated iOS implementation from Objective-C (`.m`) to Objective-C++ (`.mm`)
- **BREAKING**: Migrated Android example app from Java to Kotlin
- **BREAKING**: Migrated build system from `@react-native-community/bob` to `react-native-builder-bob` v0.40.13
- **BREAKING**: Migrated package manager from Yarn 1.x to Yarn 3.6.1
- Updated example app from JavaScript to TypeScript
- Updated example app name from `sample` to `SiftReactNativeExample`
- Migrated iOS example app from Objective-C to Swift
- Updated all development dependencies to latest versions
- Updated Gradle and Android build configuration
- Updated iOS Podfile and dependencies
- Modernized project structure and configuration files

### Removed
- Old React Native architecture files (Flipper, JNI, C++ components)
- Buck build system files
- Flow configuration (`.flowconfig`)
- Xcode project files from repository (now managed by example app)

### Fixed
- Updated to latest Sift iOS SDK
- Improved build system reliability
- Enhanced TypeScript type definitions
- Better monorepo support with workspace configuration

## [0.1.15] - 2025-04-23

- Upgraded `sift-android` to version `1.3.0`.

## [0.1.13] - 2024-09-03

### Fixed

- Fixed non-compatible kotlin versions in example application that resulted in a build error for android.