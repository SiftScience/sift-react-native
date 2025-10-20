package com.siftreactnative

import android.text.TextUtils
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
  }

  private var siftConfig: Sift.Config? = null

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

  // If your SDK actually supports page names like this; otherwise remove this method.
  @ReactMethod
  fun setPageName(pageName: String) {
    // Some SDKs use screen name APIs differently; update if needed.
    // Keeping as a no-op or adjust to your SDK’s call.
    // Example: Sift.setPageName(pageName)  <-- if such API exists
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