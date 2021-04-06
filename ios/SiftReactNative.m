#import "SiftReactNative.h"
#import <Sift/Sift.h>

@implementation SiftReactNative

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE()

# pragma mark - Configuration

RCT_EXPORT_METHOD(setSiftConfig:(NSString *)accountId beaconKey:(NSString *)beaconKey disallowCollectingLocationData: (BOOL)disallowCollectingLocationData serverUrlFormat:(NSString *)serverUrlFormat allowUsingMotionSensors: (BOOL)allowUsingMotionSensors) {
    Sift *sift = [Sift sharedInstance];
    [sift setAccountId:accountId];
    [sift setBeaconKey:beaconKey];
    [sift setDisallowCollectingLocationData:disallowCollectingLocationData];
    if ([serverUrlFormat length] > 0) {
        [sift setServerUrlFormat:serverUrlFormat];
    }
    [sift setAllowUsingMotionSensors:allowUsingMotionSensors];
    [sift upload];
}

RCT_EXPORT_METHOD(setUserId: (NSString *)userId) {
    [[Sift sharedInstance] setUserId:userId];
}

RCT_EXPORT_METHOD(unsetUserId) {
    [[Sift sharedInstance] unsetUserId];
}

RCT_EXPORT_METHOD(upload) {
    [[Sift sharedInstance] upload];
}

@end
