import React from 'react';

import {Button, Text, View, StyleSheet} from 'react-native';

const ScreenTwo = ({navigation}) => {
  const handleButtonPress = () => {
    navigation.navigate('ScreenOne');
  };

  return (
    <View style={styles.container}>
      <Text>Second screen</Text>

      <Button title="Back" onPress={handleButtonPress} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default ScreenTwo;
