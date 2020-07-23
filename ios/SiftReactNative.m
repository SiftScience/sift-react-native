#import "SiftReactNative.h"
#import <Sift/Sift.h>

@implementation SiftReactNative

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE()

# pragma mark - Configuration

RCT_EXPORT_METHOD(setSiftConfig:(NSString *)accountId beaconKey:(NSString *)beaconKey disallowCollectingLocationData: (BOOL)disallowCollectingLocationData serverUrlFormat:(NSString *)serverUrlFormat) {
    Sift *sift = [Sift sharedInstance];
    [sift setAccountId:accountId];
    [sift setBeaconKey:beaconKey];
    [sift setDisallowCollectingLocationData:disallowCollectingLocationData];
    [sift setServerUrlFormat:serverUrlFormat];
}

RCT_EXPORT_METHOD(setUserId: (NSString *)userId) {
    [[Sift sharedInstance] setUserId:userId];
}

RCT_EXPORT_METHOD(getAccountId: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject) {
    resolve([Sift sharedInstance].accountId);
}

RCT_EXPORT_METHOD(getBeaconKey: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject) {
    resolve([Sift sharedInstance].beaconKey);
}

RCT_EXPORT_METHOD(getServerUrlFormat: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject) {
    resolve([Sift sharedInstance].serverUrlFormat);
}

# pragma mark - Motion Sensors

RCT_EXPORT_METHOD(setAllowUsingMotionSensors: (BOOL)allowUsingMotionSensors) {
    [[Sift sharedInstance] setAllowUsingMotionSensors:allowUsingMotionSensors];
}

# pragma mark - Integration Helpers

RCT_EXPORT_METHOD(upload) {
    [[Sift sharedInstance] upload];
}

@end
