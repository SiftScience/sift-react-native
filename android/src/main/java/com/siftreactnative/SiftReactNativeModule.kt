package com.siftreactnative

import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import siftscience.android.Sift

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
                      serverUrlFormat: String) {
        siftConfig = Sift.Config.Builder()
          .withAccountId(accountId)
          .withBeaconKey(beaconKey)
          .withServerUrlFormat(serverUrlFormat)
          .withDisallowLocationCollection(disallowCollectingLocationData)
          .build()
        Sift.open(reactApplicationContext, siftConfig)
    }

    @ReactMethod
    fun setUserId(userId: String) {
        Sift.setUserId(userId)
    }

    @ReactMethod
    fun upload() {
        Sift.collect()
    }

    @ReactMethod
    fun unsetUserId() {
        Sift.unsetUserId()
    }

    @ReactMethod
    fun getAccountId(promise: Promise) {
        promise.resolve(siftConfig?.accountId)
    }

    @ReactMethod
    fun getBeaconKey(promise: Promise) {
        promise.resolve(siftConfig?.beaconKey)
    }

    @ReactMethod
    fun getServerUrlFormat(promise: Promise) {
        promise.resolve(siftConfig?.serverUrlFormat)
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
