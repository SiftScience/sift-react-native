package com.siftreactnative

import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class SiftReactNativePackage : TurboReactPackage() {
    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
        return when (name) {
            "SiftReactNative" -> SiftReactNativeModule(reactContext)
            else -> null
        }
    }

    override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
        return ReactModuleInfoProvider {
            mapOf(
                "SiftReactNative" to ReactModuleInfo(
                    "SiftReactNative",
                    "SiftReactNative",
                    /* canOverrideExistingModule */ false,
                    /* needsEagerInit */ false,
                    /* hasConstants */ true,
                    /* isCxxModule */ false,
                    /* isTurboModule */ true
                )
            )
        }
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }
}