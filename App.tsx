import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Login from './src/screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Admin from './src/screens/admin/Admin';
const Stack = createStackNavigator();

export default function App() {
  // useEffect(() => {
  //   initDatabase();
    
    

    
  // }, []);

  return (
    <View style={{flex: 1}}>

        {/* <AuthProvider > */}
    <NavigationContainer>
          
        <Stack.Navigator initialRouteName="Admin">
          {/* <Stack.Screen
            name="Splashscreen"
            component={Splashscreen}
            options={{headerShown: false}}
          /> */}
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          {/* <Stack.Screen
            name="Signup"
            component={Signup}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />*/}
          <Stack.Screen
            name="Admin"
            component={Admin}
            options={{headerShown: false}}
          /> 
        </Stack.Navigator>
      </NavigationContainer>
    {/* </AuthProvider> */}
    </View>
  );
}
