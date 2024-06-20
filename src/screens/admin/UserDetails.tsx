
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, FlatList, Image } from 'react-native';
import {
  Card,
  Button,
  ButtonText,
  GluestackUIProvider,
  Heading,
  Text,
  HStack,
  VStack,
  Box,
  
} from '@gluestack-ui/themed';
import { getAllUsers, deleteUser } from '../../database/database';
import {config} from '@gluestack-ui/config';


export default function UserDetails({navigation}:any) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const usersData = await getAllUsers();
    setUsers(usersData);
  };

  const handleDeleteUser = (id:any) => {
    Alert.alert(
      "Delete User",
      "Are you sure you want to delete this user?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            await deleteUser(id);
            fetchUsers(); // Refresh the users list after deletion
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handlEditUser = (item:any)=>{
    navigation.navigate('AddUser',{mode: 'Edit user',item});
    
  }

 

  const renderUser = ({ item }:any) => (
    <Card size="lg" variant="elevated" m="$3">
      <VStack>
        <Text>Name: {item.name}</Text>
        <Text>Email: {item.email}</Text>
        <Text>Phone: {item.phone}</Text>
        <Image source={{uri: `data:image/jpeg;base64,${item.image}`}} style={{width:50 , height: 50 }}/>
        <HStack mt="$2" space="md" justifyContent="flex-end" >
        
          <Button size="sm" variant="solid" action="primary" onPress={() => handlEditUser(item)}>
            <ButtonText>Edit</ButtonText>
          </Button>
          <Button size="sm" variant="solid" action="negative" onPress={() => handleDeleteUser(item.id)}>
            <ButtonText>Delete</ButtonText>
          </Button>
        </HStack>
      </VStack>
    </Card>
  );

  return (
    <GluestackUIProvider config={config}>
    
      <View style={styles.mainContainer}>
        <Heading mb="$5" fontSize={30} alignSelf="center">
          Admin Panel
        </Heading>
    
    

        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderUser}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
});
