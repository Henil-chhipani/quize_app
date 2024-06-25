// screens/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserByEmailPassword } from '../database/database';

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
    <View style={styles.container}>
      <Text style={styles.title}>Loading...</Text>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
