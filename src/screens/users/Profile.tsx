import { Alert, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Heading, Card, ScrollView } from '@gluestack-ui/themed';


export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        
        const userData = await AsyncStorage.getItem('user');
        const user = JSON.parse(userData);
        // const userData = await getUserByEmailPassword(user.email,user.password) 

        if (user !== null) {
          setUser(user);
        } else {
          Alert.alert('Error', 'Failed to load user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'Failed to load user data');
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card >
        <Heading style={styles.heading}>Profile</Heading>
        <Image source={{uri: `data:image/jpeg;base64,${user.image}`}} style={{width:90 , height: 90 , alignSelf: 'center', margin: 10, borderRadius:100}} />
        <Text style={styles.label}>
          Name: <Text style={styles.value}>{user.name}</Text>
        </Text>
        <Text style={styles.label}>
          Email: <Text style={styles.value}>{user.email}</Text>
        </Text>
        <Text style={styles.label}>
          Phone: <Text style={styles.value}>{user.phone}</Text>
        </Text>
        {/* Add more user details as needed */}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:80,
    alignItems: 'center',
    padding: 16,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    padding: 5,
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  value: {
    fontSize: 18,
    fontWeight: 'normal',
  },
});
