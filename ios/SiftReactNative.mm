// SiftReactNative.mm

#import "SiftReactNative.h"
#import <Sift/Sift.h>

@interface SiftReactNative : NSObject <SiftReactNative>
@end

@implementation SiftReactNative

// Register the module as a TurboModule.
// (TurboModules may be auto-registered if you’re using codegen; if not, RCT_EXPORT_MODULE is still needed)
RCT_EXPORT_MODULE();

// If your module needs to run on the main thread, override methodQueue.
- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

- (void)setSiftConfig:(NSString *)accountId
            beaconKey:(NSString *)beaconKey
disallowCollectingLocationData:(BOOL)disallowCollectingLocationData
       serverUrlFormat:(NSString *)serverUrlFormat {
  Sift *sift = [Sift sharedInstance];
  [sift setAccountId:accountId];
  [sift setBeaconKey:beaconKey];
  [sift setDisallowCollectingLocationData:disallowCollectingLocationData];
  if ([serverUrlFormat length] > 0) {
    [sift setServerUrlFormat:serverUrlFormat];
  }
  [sift upload];
}

- (void)setUserId:(NSString *)userId {
  [[Sift sharedInstance] setUserId:userId];
}

- (void)unsetUserId {
  [[Sift sharedInstance] unsetUserId];
}

- (void)upload {
  [[Sift sharedInstance] upload];
}

@end