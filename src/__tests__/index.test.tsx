import type { Spec } from '../NativeSiftReactNative';

// Create a stable mock of the native module that the TurboModuleRegistry returns
// Note: Jest allows referencing variables prefixed with `mock` from jest.mock factory
const mockNativeModule: jest.Mocked<Spec> = {
  setSiftConfig: jest.fn(),
  setUserId: jest.fn(),
  unsetUserId: jest.fn(),
  upload: jest.fn(),
  onHostResume: jest.fn(),
  onHostPause: jest.fn(),
};

jest.mock('react-native', () => ({
  TurboModuleRegistry: {
    // Return our native module only for our library; otherwise return an empty object
    getEnforcing: jest.fn((moduleName: string) =>
      moduleName === 'SiftReactNative' ? mockNativeModule : {}
    ),
  },
}));

describe('SiftReactNative JS API', () => {
  // Import after mocks so it uses our mocked TurboModule
  const lib = require('..');
  const SiftReactNative = lib.default as Spec;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('forwards setSiftConfig to native (triggers analytics upload natively)', () => {
    const accountId = 'acct';
    const beaconKey = 'beacon';
    const disallow = true;
    const serverUrl =
      'https://api3.siftscience.com/v3/accounts/%s/mobile_events';

    // Act
    SiftReactNative.setSiftConfig(accountId, beaconKey, disallow, serverUrl);

    // Assert - JS forwards correctly to native
    expect(mockNativeModule.setSiftConfig).toHaveBeenCalledTimes(1);
    expect(mockNativeModule.setSiftConfig).toHaveBeenCalledWith(
      accountId,
      beaconKey,
      disallow,
      serverUrl
    );
  });

  it('calls native upload (analytics send)', () => {
    // Act
    SiftReactNative.upload();

    // Assert
    expect(mockNativeModule.upload).toHaveBeenCalledTimes(1);
    expect(mockNativeModule.upload).toHaveBeenCalledWith();
  });

  it('sets userId and then uploads (user id included with analytics)', () => {
    const userId = '123';

    // Act
    SiftReactNative.setUserId(userId);
    SiftReactNative.upload();

    // Assert order is not strictly enforced here, but both should be called
    expect(mockNativeModule.setUserId).toHaveBeenCalledTimes(1);
    expect(mockNativeModule.setUserId).toHaveBeenCalledWith(userId);
    expect(mockNativeModule.upload).toHaveBeenCalledTimes(1);
  });

  it('matches the example flow: config + userId + upload with all fields', () => {
    const accountId = 'acct';
    const beaconKey = 'beacon';
    const disallow = true; // example uses true
    const serverUrl =
      'https://api3.siftscience.com/v3/accounts/%s/mobile_events';
    const userId = '1234';

    // Act: same order as example
    SiftReactNative.setSiftConfig(accountId, beaconKey, disallow, serverUrl);
    SiftReactNative.setUserId(userId);
    SiftReactNative.upload();

    // Assert: all fields passed through
    expect(mockNativeModule.setSiftConfig).toHaveBeenCalledWith(
      accountId,
      beaconKey,
      disallow,
      serverUrl
    );
    expect(mockNativeModule.setUserId).toHaveBeenCalledWith(userId);
    expect(mockNativeModule.upload).toHaveBeenCalledTimes(1);

    // Assert call order: setSiftConfig -> setUserId -> upload
    const configOrder = (mockNativeModule.setSiftConfig as jest.Mock).mock
      .invocationCallOrder[0]!;
    const setUserOrder = (mockNativeModule.setUserId as jest.Mock).mock
      .invocationCallOrder[0]!;
    const uploadOrder = (mockNativeModule.upload as jest.Mock).mock
      .invocationCallOrder[0]!;

    expect(configOrder).toBeLessThan(setUserOrder);
    expect(setUserOrder).toBeLessThan(uploadOrder);
  });

  it('calls native onHostResume', () => {
    SiftReactNative.onHostResume();
    expect(mockNativeModule.onHostResume).toHaveBeenCalledTimes(1);
    expect(mockNativeModule.onHostResume).toHaveBeenCalledWith();
  });

  it('calls native onHostPause', () => {
    SiftReactNative.onHostPause();
    expect(mockNativeModule.onHostPause).toHaveBeenCalledTimes(1);
    expect(mockNativeModule.onHostPause).toHaveBeenCalledWith();
  });

  it('forwards serverUrlFormat with %s placeholder (Android-style)', () => {
    const accountId = 'acct';
    const beaconKey = 'beacon';
    const disallow = true;
    const serverUrl =
      'https://api3.siftscience.com/v3/accounts/%s/mobile_events';

    SiftReactNative.setSiftConfig(accountId, beaconKey, disallow, serverUrl);

    expect(mockNativeModule.setSiftConfig).toHaveBeenCalledWith(
      accountId,
      beaconKey,
      disallow,
      serverUrl
    );
  });

  it('forwards serverUrlFormat with %@ placeholder (iOS-style)', () => {
    const accountId = 'acct';
    const beaconKey = 'beacon';
    const disallow = true;
    const serverUrl =
      'https://api3.siftscience.com/v3/accounts/%@/mobile_events';

    SiftReactNative.setSiftConfig(accountId, beaconKey, disallow, serverUrl);

    expect(mockNativeModule.setSiftConfig).toHaveBeenCalledWith(
      accountId,
      beaconKey,
      disallow,
      serverUrl
    );
  });

  it('isBridgeAvailable returns true when bridge is present', () => {
    expect(lib.isBridgeAvailable()).toBe(true);
  });
});
