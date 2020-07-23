import React, { useState } from 'react';
import {
  Alert,
  Platform, 
  StyleSheet, 
  View, 
  TextInput,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import SiftReactNative from 'sift-react-native';

const ConfigurationScreen = () => {
  let [accountId, setAccountId] = useState('');
  let [beaconKey, setBeaconKey] = useState('');
  let defaultUrl = Platform.OS === 'ios' ? 'https://api3.siftscience.com/v3/accounts/%@/mobile_events' : 'https://api3.siftscience.com/v3/accounts/%s/mobile_events';
  let [serverUrlFormat, setServerUrlFormat] = useState(defaultUrl);
  let [userId, setUserId] = useState('');
  let [errortext, setErrortext] = useState('');
  let [isUploadSuccess, setIsUploadSuccess] = useState(false);

  const handleSubmitButton = () => {
    setErrortext('');
    if (!accountId) {
      Alert.alert("Missing Fields", "Please fill Account ID");
      return;
    }
    if (!beaconKey) {
      Alert.alert("Missing Fields", "Please fill Beacon Key");
      return;
    }
    setIsUploadSuccess(true);
  };
  if (isUploadSuccess) {
    SiftReactNative.setSiftConfig(accountId, beaconKey, true, serverUrlFormat);
    SiftReactNative.setUserId(userId);
    if (Platform.OS === 'ios') {
      SiftReactNative.setAllowUsingMotionSensors(true);
    }
    SiftReactNative.upload();

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#307ecc',
          justifyContent: 'center',
        }}>
        
        <Text style={styles.successTextStyle}>DONE</Text>
        
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#307ecc' }}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView enabled>
          <View style={{padding: 10}}/>
          <Text style={styles.titleTextStyle}>Sift SDK Example</Text>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              value={accountId}
              onChangeText={AccountId => setAccountId(AccountId)}
              placeholder="Enter Account ID"
              placeholderTextColor="#F6F6F7"
              autoCapitalize="sentences"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              value={beaconKey}
              onChangeText={BeaconKey => setBeaconKey(BeaconKey)}
              placeholder="Enter Beacon Key"
              placeholderTextColor="#F6F6F7"        
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>
           <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              value={userId}
              onChangeText={UserId => setUserId(UserId)}
              placeholder="Enter User ID"
              placeholderTextColor="#F6F6F7"
              keyboardType="email-address"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              value={serverUrlFormat}
              onChangeText={ServerUrlFormat => setServerUrlFormat(ServerUrlFormat)}
              placeholder="Enter Server URL Format"
              placeholderTextColor="#F6F6F7"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>
          <Text style={styles.hintTextStyle}>Default: {defaultUrl}</Text>
         
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}> {errortext} </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>UPLOAD</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default ConfigurationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: 'white',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    fontWeight: 'bold',
    color: '#307ecc',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'white',
  },
  titleTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 40,
  },
  hintTextStyle: {
    color: 'black',
    textAlign: 'center',
    fontSize: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});
