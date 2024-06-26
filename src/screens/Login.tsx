import {StyleSheet, View, SafeAreaView, TouchableOpacity} from 'react-native';
import React,{useState} from 'react';
import {
  ButtonText,
  Card,
  Button,
  GluestackUIProvider,
  Heading,
  Input,
  InputField,
  Text,
  Link,
  LinkText,
  HStack,
} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import {getUserByEmailPassword} from '../database/userTable';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const admins = ['admin@admin.com'];

export default function Login({navigation}: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
    if (email && password) {
      try {

        const user = await getUserByEmailPassword(email,password)
        await AsyncStorage.setItem('user', JSON.stringify(user));


        if (!user) {
          console.log("Incorrect email or password");
        } else {
          setEmail('');
          setPassword('');
          if(admins.includes(user.email)){
          navigation.replace("Admin"); }
          else{
            navigation.replace("UserPage"); 
          }
        }
      } catch (error) {
        console.error("Error during login: ", error);
      }
    } else {
      console.log('Please fill all fields');
    }
  };


  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.mainContainer}>
          <Card size="lg" variant="elevated" m="$3">
            <Heading mb="$5" fontSize={30} alignSelf="center">
              Login
            </Heading>
            <Input

              variant="rounded"
              size="lg"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
              mb="$10">
              <InputField placeholder="Enter Email here" value={email} onChangeText={setEmail} />
            </Input>

            <Input
              variant="rounded"
              size="lg"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}>
              <InputField placeholder="Enter password here" type="password" value={password} onChangeText={setPassword} />
            </Input>

            <Button
              size="md"
              variant="solid"
              action="primary"
              isDisabled={false}
              isFocusVisible={false}
              mt="$10"
              width="$20"
              alignSelf="center"
              borderRadius={20} onPress={handleLogin}>
              <ButtonText>Login </ButtonText>
            </Button>
          </Card>

          <HStack alignSelf="center">
            <Text size="lg">Don't have account </Text>
            <Link onPress={() => navigation.navigate('Signup')} isExternal>
              <LinkText size="lg">singup</LinkText>
            </Link>
          </HStack>
        </View>
      </SafeAreaView>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
