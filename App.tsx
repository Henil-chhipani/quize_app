import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Login from './src/screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Admin from './src/screens/admin/Admin';
import AddUser from './src/screens/admin/AddUser';
import {initDatabase, insetAdmin} from './src/database/database';
import UserDetails from './src/screens/admin/UserDetails';
import AddQustions from './src/screens/admin/AddQustions';
import Report from './src/screens/admin/Report';
import Quiz from './src/screens/users/Quiz';
import UserPage from './src/screens/users/UserPage';
import {config} from '@gluestack-ui/config';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import UserReport from './src/screens/users/UserReport';
import Profile from './src/screens/users/Profile';
import SplashScreen from './src/screens/SplashScreen';
const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    initDatabase();
    insetAdmin();
  }, []);

  return (
    <GluestackUIProvider config={config}>
      <View style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SplashScreen">
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{headerShown: false}}
            />
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
            <Stack.Screen
              name="AddQustions"
              component={AddQustions}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Report"
              component={Report}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Quiz"
              component={Quiz}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="UserPage"
              component={UserPage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="UserReport"
              component={UserReport}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </GluestackUIProvider>
  );
}
