package com.siftreactnative

import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule
import siftscience.android.Sift


@ReactModule(name = SiftReactNativeModule.NAME)
class SiftReactNativeModule(reactContext: ReactApplicationContext) :
  NativeSiftReactNativeSpec(reactContext), LifecycleEventListener {

  companion object {
    const val NAME = "SiftReactNative"

    // The Sift SDK is a process-wide singleton, so the state that mirrors it
    // outlives any single module instance (a JS reload creates a new one).
    @Volatile
    private var siftConfig: Sift.Config? = null
  }

  init {
    reactContext.addLifecycleEventListener(this)
  }

  override fun getName(): String = NAME

  @ReactMethod
  override fun setSiftConfig(
    accountId: String,
    beaconKey: String,
    disallowCollectingLocationData: Boolean,
    serverUrlFormat: String?
  ) {
    val builder = Sift.Config.Builder()
      .withAccountId(accountId)
      .withBeaconKey(beaconKey)
      .withDisallowLocationCollection(disallowCollectingLocationData)

    if (!serverUrlFormat.isNullOrEmpty()) {
      builder.withServerUrlFormat(serverUrlFormat)
    }

    siftConfig = builder.build()
    Sift.open(reactApplicationContext, siftConfig)
    Sift.collect()
  }

  @ReactMethod
  override fun setUserId(userId: String?) {
    if (!userId.isNullOrEmpty()) {
      Sift.setUserId(userId)
    }
  }

  @ReactMethod
  override fun unsetUserId() {
    Sift.unsetUserId()
  }

  @ReactMethod
  override fun upload() {
    Sift.collect()
  }

  @ReactMethod
  override fun setPageName(pageName: String?) {
    // The SDK keeps the screen name itself, including before it is configured,
    // and null or an empty name clears it.
    Sift.setScreenTitle(pageName)
    if (siftConfig == null) return
    Sift.collect()
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