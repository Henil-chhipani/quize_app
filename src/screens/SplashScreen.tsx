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
    <StatusBar backgroundColor={"#fff"} barStyle="light-content" />
    <View style={styles.container}>
      <View style={{height:190, width:200, overflow:"hidden"}}>
    <Image
      height={200}
      width={200}
      source={{uri: 'https://www.shutterstock.com/image-vector/quiz-logo-time-label-question-260nw-2299277831.jpg'}}
      
    /></View>
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
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
