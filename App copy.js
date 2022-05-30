import { StyleSheet } from 'react-native';
import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Button, View } from 'react-native';

import Oth from './screens/SignInScreen';

export default function App() {
 
  return (
    <View style={styles.container}>
      <Oth/>
    </View>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});