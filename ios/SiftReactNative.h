#import <ReactCommon/RCTTurboModule.h>
#import <React/RCTBridgeModule.h>

@protocol SiftReactNative <RCTTurboModule, RCTBridgeModule>

// Declare your methods (they will be automatically exposed to JS)
- (void)setSiftConfig:(NSString *)accountId
                         beaconKey:(NSString *)beaconKey
    disallowCollectingLocationData:(BOOL)disallowCollectingLocationData
                   serverUrlFormat:(NSString *)serverUrlFormat;

- (void)setUserId:(NSString *)userId;
- (void)unsetUserId;
- (void)upload;

@end