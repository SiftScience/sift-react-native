import { TurboModuleRegistry, TurboModule } from 'react-native';

export interface Spec extends TurboModule {
  setSiftConfig(
    accountId: string,
    beaconKey: string,
    disallowCollectingLocationData: boolean,
    serverUrlFormat: string
  ): void;
  setUserId(userId: string): void;
  unsetUserId(): void;
  upload(): void;
  onHostResume(): void;
  onHostPause(): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('SiftReactNative');
