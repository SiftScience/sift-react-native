
# sift-react-native

A React Native wrapper for Sift  [iOS](https://github.com/SiftScience/sift-ios) and [Android](https://github.com/SiftScience/sift-android) SDKs

## Installation

```sh
npm install sift-react-native
```

## Usage
First, import the module:
```js
import SiftReactNative from "sift-react-native";
```
Then, invoke the following method to initialise the SDK:
#### Configure the account details
```js
SiftReactNative.setSiftConfig(accountId, beaconKey, disallowCollectingLocationData, serverUrlFormat);
```
Where:
- **accountId** (string, the Account ID that needs to be obtained from Sift console under [API Keys](https://console.sift.com/developer/api-keys) tab) **_required_**
- **beaconKey** (string, the Beacon Key that needs to be obtained from Sift console under [API Keys](https://console.sift.com/developer/api-keys) tab) **_required_**
- **disallowCollectingLocationData** (boolean, permission to allow collection of location data from device)
- **serverUrlFormat** (string, the format of URL where the data needs to be uploaded)
-- Sample URL format for iOS: `https://api3.siftscience.com/v3/accounts/%@/mobile_events`
-- Sample URL format for Android: `https://api3.siftscience.com/v3/accounts/%s/mobile_events`

#### Set the User ID
As soon as your application is aware of the user id, set it on the Sift instance using the code below. All subsequent events will include the user id.
```js
SiftReactNative.setUserId(userId);
```
If the user logs out of your application, you should unset the user id:
```js    
SiftReactNative.unsetUserId();
```
#### Set motion sensors (_iOS only_)
If your app uses motion sensors (accelerometer, gyro, or magnetometer), and you want to send motion data to Sift, add this line:
```js 
if (Platform.OS === 'ios') {
   SiftReactNative.setAllowUsingMotionSensors(true);
}
```
This will enable the SDK to occasionally collect motion data in the background.
#### Start Tracking
```js    
SiftReactNative.upload();
```


#### Getter methods
```js
const accountId = await SiftReactNative.getAccountId();
const beaconKey = await SiftReactNative.getBeaconKey();
const serverUrlFormat = await SiftReactNative.getServerUrlFormat();
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

