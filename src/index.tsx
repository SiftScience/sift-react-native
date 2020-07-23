import { NativeModules } from 'react-native';

type SiftReactNativeType = {
  setSiftConfig(accountId: string, beaconKey: string, disallowCollectingLocationData: boolean, serverUrlFormat: string): void;
  setUserId(userId: string): void;
  setAllowUsingMotionSensors(allowUsingMotionSensors: boolean): void;
  upload(): void;
  unsetUserId(): void;
  getAccountId(): Promise<string>;
  getBeaconKey(): Promise<string>;
  getServerUrlFormat(): Promise<string>;
};

const { SiftReactNative } = NativeModules;

export default SiftReactNative as SiftReactNativeType;
