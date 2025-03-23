import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface SiftReactNative extends TurboModule {
  setSiftConfig(
    accountId: string,
    beaconKey: string,
    disallowCollectingLocationData: boolean,
    serverUrlFormat: string
  ): void;
  setUserId(userId: string): void;
  unsetUserId(): void;
  upload(): void;
}

export default TurboModuleRegistry.getEnforcing<SiftReactNative>(
  'SiftReactNative'
);
