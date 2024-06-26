import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
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
  Icon,
  MenuIcon,
  AddIcon,
  ButtonIcon,
  GripVerticalIcon,
} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';

export default function Admin({navigation}: any) {

  const handleLogout =  ()=>{
    navigation.replace('Login');
  }

  return (
    <GluestackUIProvider config={config}>
      {/* <Card size="md" variant="elevated" m="$3" backgroundColor="$green50"> */}
      <Heading mb="$5" fontSize={30} alignSelf="center" mt={20}>
        Admin
      </Heading>

      {/* </Card> */}

      <Card size="md" variant="elevated" m="$3" backgroundColor="$green50" overflow="hidden">
        <Button
          size="md"
          variant="solid"
          action="primary"
          isDisabled={false}
          isFocusVisible={false}
          marginVertical={10}
          borderRadius={15}
          margin={20}
          onPress={() => {
            navigation.navigate('AddUser', {mode: 'Add user', item: null});
          }}>
          <ButtonText>Create User</ButtonText>
          <ButtonIcon as={AddIcon} />
        </Button>

        <Button
          marginVertical={10}
          margin={20}
          borderRadius={15}
          size="md"
          variant="solid"
          action="primary"
          onPress={() => {
            navigation.navigate('UserDetails');
          }}
          isDisabled={false}
          isFocusVisible={false}>
          <ButtonText>User Details</ButtonText>
          <ButtonIcon as={MenuIcon} />
        </Button>

        <Button
          marginVertical={10}
          margin={20}
          borderRadius={15}
          size="md"
          variant="solid"
          action="primary"
          onPress={() => {
            navigation.navigate('AddQustions');
          }}
          isDisabled={false}
          isFocusVisible={false}>
          <ButtonText>Add Qustions</ButtonText>
          <ButtonIcon as={AddIcon} />
        </Button>

        <Button
          marginVertical={10}
          margin={20}
          borderRadius={15}
          size="md"
          variant="solid"
          action="primary"
          isDisabled={false}
          isFocusVisible={false}
          onPress={() => {
            navigation.navigate('Report');
          }}>
          <ButtonText>Report</ButtonText>

          <ButtonIcon as={GripVerticalIcon} />
        </Button>
        <Button
          marginTop={50}
          margin={20}
          borderRadius={15}
          size="sm"
          variant="solid"
          action="negative"
          width={100}
          alignSelf="center"
          isDisabled={false}
          onPress={handleLogout}
          isFocusVisible={false}>
          <ButtonText >Logout </ButtonText>
        </Button>
      
      </Card>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({});
