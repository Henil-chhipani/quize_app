// screens/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator,Image, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserByEmailPassword } from '../database/userTable';

export default function SplashScreen({ navigation }:any) {
  useEffect(() => {
    const checkUser = async () => {
      try {
        const raw_userData = await AsyncStorage.getItem('user');
        const user = JSON.parse(raw_userData);
        const userData = await getUserByEmailPassword(user.email,user.password) 

        if (userData) {
        
          if (userData.name === 'admin') {
            navigation.replace('Admin');
          } else {
            navigation.replace('UserPage');
          }
        } else {
          navigation.replace('Login');
        }
      } catch (error) {
        console.error('Error checking user data:', error);
        navigation.replace('Login');
      }
    };

    setTimeout(checkUser, 2000); // Simulate a loading period
  }, [navigation]);

  return (
    <>
    <StatusBar backgroundColor={"#050A30"} barStyle="light-content" />
    <View style={styles.container}>
      <Image  source={require('../../assets/splashscreen.png')} />
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#050A30",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
