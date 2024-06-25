import {FlatList, StyleSheet, View} from 'react-native';
import React, {useState,useEffect} from 'react';
import {getAllUsers,getAllUsersWithMarks} from '../../database/database';
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
import {config} from '@gluestack-ui/config';

export default function Report() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, [])

  const fetchUsers = async () => {
    const usersData = await getAllUsersWithMarks();
    setUsers(usersData);
  };

  const renderUser = ({item}: any) => (
    <Card size="lg" variant="elevated" m="$3">
      <VStack>
        <Text>Name: {item.name}</Text>
        <Text>Email: {item.email}</Text>   
        <Text>Mark: {item.Mark}</Text>   

      </VStack>
    </Card>
  );

  return (
    <GluestackUIProvider config={config}>
      <View style={styles.mainContainer}>
        <Heading mb="$5" fontSize={30} alignSelf="center">
        Report
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

const styles = StyleSheet.create({  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },});
