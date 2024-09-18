import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SiftReactNative from 'sift-react-native';
import ScreenTwo from './screens/screentwo';
import ScreenOne from './screens/screenone';

const Stack = createNativeStackNavigator();

const Root = () => {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  useEffect(() => {
    const initialRouteName = routeNameRef.current;
    console.log('Initial screen is:', initialRouteName);
    SiftReactNative.setPageName(`screen_${initialRouteName}`);
    SiftReactNative.upload();
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() =>
        (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
      }
      onStateChange={() => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          // Replace the line below to add the tracker from a mobile analytics SDK
          //alert(`The route changed to ${currentRouteName}`);
          console.log('Screen focused is:', currentRouteName);
          SiftReactNative.setPageName(`screen_${currentRouteName}`);
          SiftReactNative.upload();
        }

        // Save the current route name for later comparison
        routeNameRef.current = currentRouteName;
      }}>
      <Stack.Navigator>
        <Stack.Screen name="ScreenOne" component={ScreenOne} />
        <Stack.Screen name="ScreenTwo" component={ScreenTwo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Root;
