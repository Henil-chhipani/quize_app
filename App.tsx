import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Login from './src/screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Admin from './src/screens/admin/Admin';
import AddUser from './src/screens/admin/AddUser';
import {initDatabase} from './src/database/database';
import UserDetails from './src/screens/admin/UserDetails';
const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    initDatabase();
    
    

    
  }, []);

  return (
    <View style={{flex: 1}}>

        {/* <AuthProvider > */}
    <NavigationContainer>
          
        <Stack.Navigator initialRouteName="Admin">
   
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AddUser"
            component={AddUser}
            options={{headerShown: false}}
          /> 

          <Stack.Screen
            name="Admin"
            component={Admin}
            options={{headerShown: false}}
          /> 
          <Stack.Screen
            name="UserDetails"
            component={UserDetails}
            options={{headerShown: false}}
          /> 
        </Stack.Navigator>
      </NavigationContainer>
    {/* </AuthProvider> */}
    </View>
  );
}
