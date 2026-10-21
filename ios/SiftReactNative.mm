#import "SiftReactNative.h"
#import <Sift/Sift.h>

@implementation SiftReactNative

// The Sift SDK is a process-wide singleton, so the state that mirrors it
// outlives any single module instance (a JS reload creates a new one).
static BOOL sConfigured = NO;
static NSString *sPageName = nil;

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
    NSString *pageName;
    @synchronized (SiftReactNative.class) {
        sConfigured = YES;
        pageName = sPageName;
    }
    [sift setScreenTitle:pageName];
    if (pageName) {
        [sift collect];
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

RCT_EXPORT_METHOD(setPageName:(NSString *)pageName) {
    NSString *name = ([pageName isKindOfClass:NSString.class] && pageName.length > 0)
        ? [pageName copy]
        : nil;

    BOOL configured;
    @synchronized (SiftReactNative.class) {
        sPageName = name;
        configured = sConfigured;
    }
    if (!configured) {
        return;
    }

    Sift *sift = [Sift sharedInstance];
    [sift setScreenTitle:name];
    [sift collect];
}


- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeSiftReactNativeSpecJSI>(params);
}

@end
