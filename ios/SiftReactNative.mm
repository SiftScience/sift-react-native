#import "SiftReactNative.h"
#import <Sift/Sift.h>

@implementation SiftReactNative
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(setSiftConfig:(NSString *)accountId beaconKey:(NSString *)beaconKey disallowCollectingLocationData:
(BOOL)disallowCollectingLocationData serverUrlFormat:(NSString *)serverUrlFormat) {
    Sift *sift = [Sift sharedInstance];
    [sift setAccountId:accountId];
    [sift setBeaconKey:beaconKey];
    [sift setDisallowCollectingLocationData:disallowCollectingLocationData];
    if ([serverUrlFormat length] > 0) {
        [sift setServerUrlFormat:serverUrlFormat];
    }
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

RCT_EXPORT_METHOD(onHostPause) {
    [[Sift sharedInstance] pause];
}

RCT_EXPORT_METHOD(onHostResume) {
    [[Sift sharedInstance] resume];
}


- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeSiftReactNativeSpecJSI>(params);
}

@end
