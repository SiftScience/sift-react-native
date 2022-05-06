package com.siftreactnative

import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import siftscience.android.Sift
import android.text.TextUtils

class SiftReactNativeModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext),
  LifecycleEventListener {
    private var siftConfig: Sift.Config? = null

    init {
        reactContext.addLifecycleEventListener(this)
    }

    override fun getName(): String {
        return "SiftReactNative"
    }

    @ReactMethod
    fun setSiftConfig(accountId: String, beaconKey: String, disallowCollectingLocationData: Boolean,
                      serverUrlFormat: String, allowUsingMotionSensors: Boolean) {
        // Motion sensor API is not available in Sift Android SDK.
        siftConfig = if (TextUtils.isEmpty(serverUrlFormat)) {
          Sift.Config.Builder()
            .withAccountId(accountId)
            .withBeaconKey(beaconKey)
            .withDisallowLocationCollection(disallowCollectingLocationData)
            .build()
        } else {
          Sift.Config.Builder()
            .withAccountId(accountId)
            .withBeaconKey(beaconKey)
            .withServerUrlFormat(serverUrlFormat)
            .withDisallowLocationCollection(disallowCollectingLocationData)
            .build()
        }
        Sift.open(reactApplicationContext, siftConfig)
        Sift.collect()
    }

    @ReactMethod
    fun setUserId(userId: String) {
        if (!TextUtils.isEmpty(userId)) {
          Sift.setUserId(userId)
        }
    }

    @ReactMethod
    fun unsetUserId() {
        Sift.unsetUserId()
    }

    @ReactMethod
    fun upload() {
        Sift.collect()
    }
    
    @ReactMethod
    fun setPageName(pageName: String) {
        Sift.open(reactApplicationContext, pageName)
    }

    override fun onHostResume() {
        Sift.resume(reactApplicationContext)
    }

    override fun onHostPause() {
        Sift.pause()
    }

    override fun onHostDestroy() {
        Sift.close()
    }

    
}
