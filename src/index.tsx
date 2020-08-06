import { NativeModules } from 'react-native';

type SiftReactNativeType = {
  setSiftConfig(
    accountId: string,
    beaconKey: string,
    disallowCollectingLocationData: boolean,
    serverUrlFormat: string,
    allowUsingMotionSensors: boolean
  ): void;
  setUserId(userId: string): void;
  unsetUserId(): void;
};

const { SiftReactNative } = NativeModules;

export default SiftReactNative as SiftReactNativeType;
