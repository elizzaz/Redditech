import * as React from 'react';
import { Button, Text, TextInput, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {SignInScreen, HomeScreen, ProfilScreen, SettingScreen } from './screens/Index';
import {AuthContext} from './screens/Utils';
import { Ionicons } from '@expo/vector-icons';


// function SplashScreen() {
//   return (
//     <View>
//       <Text>Loading...</Text>
//     </View>
//   );
// }
const cors = require('cors');
//const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export default function App() {

  return (
      <NavigationContainer>
      <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Home') {
                  iconName = focused
                    ? 'ios-information-circle'
                    : 'ios-information-circle-outline';
                } else if (route.name === 'Settings') {
                  iconName = focused ? 'ios-list-box' : 'ios-list';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#EAD017',
              tabBarInactiveTintColor: '#000000',
            })}
       initialRouteName='SignInScreen'>
      <Tab.Screen name="SignInScreen" component={SignInScreen} options={{ title: 'Sign in'}} /> 
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false, title: 'Home'}} />
      <Tab.Screen name="ProfilScreen" component={ProfilScreen} options={{headerShown:false, title: 'Profil'}} />
      <Tab.Screen name="SettingScreen" component={SettingScreen} options={{headerShown:false, title: 'Settings'}} />
    </Tab.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  tab: {
    backgroundColor: '#000000',
  },
});