


# sift-react-native

React Native wrapper for Sift  [iOS](https://github.com/SiftScience/sift-ios) and [Android](https://github.com/SiftScience/sift-android) SDKs

## Installation

 - Install library from **npm**:  
          `yarn add sift-react-native`  
          or  
          `npm install sift-react-native`  

## Link native code 

### Android React Native 0.60.0 or above
No additional setup is required

### iOS React Native 0.60.0 or above
1.  Insert the following line in Podfile where new pods are added:
`pod 'sift-react-native', :path => '../node_modules/sift-react-native'`
2.  Navigate to the ios directory of the project via terminal and run  `pod install`

### Android React Native 0.59 or below
#### Automatically
`react-native link`

#### Manually
1.  Append the following lines to  `android/settings.gradle`:
    
    `include ':sift-react-native'`
    
    `project(':sift-react-native').projectDir = new File(rootProject.projectDir, '../node_modules/sift-react-native/android')`
    
2.  Insert the following lines inside the dependencies block in  `android/app/build.gradle`:
    
    implementation project(':sift-react-native')
    
3.  Open up  `android/app/src/main/java/[...]/MainApplication.java`
    

-   Add  `import com.siftreactnative.SiftReactNativePackage;`  to the imports at the top of the file
-   Add  `new SiftReactNativePackage()`  to the list returned by the  `getPackages()`  method. Add a comma to the previous item if there's already something there.


Insert the following lines inside the dependencies block in 
   `android/app/build.gradle`:
       
       implementation 'com.android.support:support-v4:27.0.2'

### iOS React Native 0.59 or below
Support will be available soon    

## Usage
First, import the module:
```js
import SiftReactNative from "sift-react-native";
```
Then, invoke the following method to initialise the SDK:
#### Configure the account details
```js
SiftReactNative.setSiftConfig(accountId, beaconKey, disallowCollectingLocationData, serverUrlFormat, allowUsingMotionSensors);
```
Where:
- **accountId** (string, the Account ID that needs to be obtained from Sift console under [API Keys](https://console.sift.com/developer/api-keys) tab) **_required_**
- **beaconKey** (string, the Beacon Key that needs to be obtained from Sift console under [API Keys](https://console.sift.com/developer/api-keys) tab) **_required_**
- **disallowCollectingLocationData** (boolean, permission to allow collection of location data from device)
> _Make sure to add location permissions to your application if you want Sift to collect location data.
Sift will not request permissions that are not granted by the user from your application._
- **serverUrlFormat** (string, the format of URL where the data needs to be uploaded)
-- Sample URL format for iOS: `https://api3.siftscience.com/v3/accounts/%@/mobile_events`
-- Sample URL format for Android: `https://api3.siftscience.com/v3/accounts/%s/mobile_events`
- **allowUsingMotionSensors** (boolean, If your app uses motion sensors [_accelerometer, gyro, or magnetometer_], and you want to send motion data to Sift)
> This will enable the SDK to occasionally collect motion data in the background.
> **_NB: This feature is available only in iOS platform_**
#### Set the User ID
As soon as your application is aware of the user id, set it on the Sift instance using the code below. All subsequent events will include the user id.
```js
SiftReactNative.setUserId(userId);
```
If the user logs out of your application, you should unset the user id:
```js    
SiftReactNative.unsetUserId();
```
#### Upload event 
To upload collected events to sift.
```js
SiftReactNative.upload();
```

## Example

To see `sift-react-native` in action you can check out the source in the `example` folder.

### To initialize example project

    yarn bootstrap

When the bootstrap is done, you will be able to start the example app by executing one of the following commands:
### iOS app

    yarn example ios

### Android app

    yarn example android

## License

MIT

