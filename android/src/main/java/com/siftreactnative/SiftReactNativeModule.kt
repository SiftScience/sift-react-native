package com.siftreactnative

import android.text.TextUtils
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.turbomodule.core.interfaces.TurboModule
import com.facebook.react.bridge.LifecycleEventListener
import siftscience.android.Sift

class SiftReactNativeModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext),
    TurboModule,
    LifecycleEventListener {

    private var siftConfig: Sift.Config? = null

    init {
        reactContext.addLifecycleEventListener(this)
    }

    override fun getName(): String {
        return "SiftReactNative"
    }

    @ReactMethod
    fun setSiftConfig(
        accountId: String,
        beaconKey: String,
        disallowCollectingLocationData: Boolean,
        serverUrlFormat: String
    ) {
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
                .withDisallowLocationCollection(disallowCollectingLocationData)
                .withServerUrlFormat(serverUrlFormat)
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