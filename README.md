﻿


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

Mostly autolinking will do the job. If manual linking is required, please follow the below steps:
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
SiftReactNative.setSiftConfig(accountId, beaconKey, disallowCollectingLocationData, serverUrlFormat);
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
#### Set page name 
>**_NB: This feature is available only in Android platform_**

To set the page name
```js
SiftReactNative.setPageName("HomePage");
```
## Track Screen Navigation 

##### 1.  If you don't have root.js, create it, which file serves as the root component of the React Native application. It sets up the navigation using React Navigation and  integrates with the `sift-react-native` library for tracking screen views. Install and import neccessary dependencies.

##### 2.   Create a stack navigator using createNativeStackNavigator() from @react-navigation/native-stack
             `const Stack = createNativeStackNavigator();`
             
##### 3.   Define the Root component and set up the navigation container
           ` import { NavigationContainer } from '@react-navigation/native';`
           
##### 4.   Inside the Root component, the useEffect hook is used to track the initial screen view by setting the page name with  `SiftReactNative.setPageName()` and uploading the event with `SiftReactNative.upload()`.
              `SiftReactNative.setPageName(`screen_${currentRouteName}`);`
              ` SiftReactNative.upload();`

##### 5.   The ref and event handlers are used to track and update the current screen name dynamically.
               ` const routeNameRef = React.useRef();`
               ` const navigationRef = React.useRef();`
            
##### 6.   The NavigationContainer component wraps the stack navigator and provides the navigation context.
              `<NavigationContainer
                  ref={navigationRef}
                  onReady={() =>
                     (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
                    }
                  onStateChange={() => {
                  const previousRouteName = routeNameRef.current;
                  const currentRouteName = navigationRef.current.getCurrentRoute().name;

                  if (previousRouteName !== currentRouteName) {
                    console.log('Screen focused is:', currentRouteName);
                    SiftReactNative.setPageName(`screen_${currentRouteName}`);
                    SiftReactNative.upload();
                  }

                  routeNameRef.current = currentRouteName;
              }}>
             <Stack.Navigator>
               <Stack.Screen name="your screen name" component={your component} />
               <Stack.Screen name="your screen name" component={your component} />
             </Stack.Navigator>
           </NavigationContainer>`


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

