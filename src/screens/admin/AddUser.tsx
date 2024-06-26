import {
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  launchImageLibrary,
  launchCamera,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import {
  ButtonText,
  Card,
  Button,
  GluestackUIProvider,
  Heading,
  Input,
  InputField,
  Text,
  HStack,
  LinkText,
  Link,
} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import {SafeAreaView} from 'react-native-safe-area-context';
import {insertUser, updateUser} from '../../database/userTable';

export default function AddUser({navigation, route}: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const {mode, item} = route.params;
  const [image, setImage] = useState('');

  const handlePhoneNumberChange = text => {
    const numericText = text.replace(/[^0-9]/g, '');
    setPhoneNumber(numericText);
  };

  useEffect(() => {
    if (route.params && route.params.item) {
      const {name, email, phone, password, image} = route.params.item;
      setName(name);
      setEmail(email);
      setPhoneNumber(phone);
      setPassword(password);
      setImage(image);
    }
  }, [route.params]);

  const handleSignup = async () => {
    if (name && email && phoneNumber && password && image) {
      if (mode == 'Edit user') {
        await updateUser(
          name,
          email,
          phoneNumber,
          password,
          image,
          route.params.item.id,
        );
        Alert.alert('Updated', 'User updated successfully', [
          {
            text: 'OK',
            onPress: () => navigation.replace('UserDetails'),
          },
        ]);
      } else {
        await insertUser(name, email, phoneNumber, password, image);
        Alert.alert(
          'User added',
          'User added successfully',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Admin'),
            },
          ],
        );
        console.log('User Added up successfully');
      }
    } else {
      console.log('Please fill all fields');
    }
  };

  const handleChoosePhoto = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
    };
    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
// adding base64 image to database 
        const base64 = response.base64 || response.assets[0].base64;
        setImage(base64)
        
      }
    });
  };

  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.mainContainer}>
          <Card size="lg" variant="elevated" m="$3">
            <Heading mb="$5" fontSize={30} alignSelf="center">
              {mode && mode === 'Edit user' ? 'Edit user' : 'Add user'}
            </Heading>

            <TouchableOpacity
              onPress={handleChoosePhoto}
              style={styles.imagePicker}>
              <View style={styles.imageContainer}>
                {image ? (
                  <Image source={{uri: `data:image/jpeg;base64,${image}`}}  style={styles.image} />
                ) : (
                  <Text>Add Photo</Text>
                )}
              </View>
            </TouchableOpacity>

            <Input
              variant="rounded"
              size="lg"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
              mb="$10">
              <InputField
                placeholder="Enter Name here"
                value={name}
                onChangeText={setName}
              />
            </Input>

            <Input
              variant="rounded"
              size="lg"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
              mb="$10">
              <InputField
                placeholder="Enter Email here"
                value={email}
                onChangeText={setEmail}
              />
            </Input>
            <Input
              variant="rounded"
              size="lg"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
              mb="$10">
              <InputField
                placeholder="Enter Phone number here"
                value={phoneNumber}
                keyboardType="numeric"
                onChangeText={handlePhoneNumberChange}
              />
            </Input>

            <Input
              variant="rounded"
              size="lg"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}>
              <InputField
                placeholder="Enter password here"
                type="password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
            </Input>

            <Button
              size="md"
              variant="solid"
              action="primary"
              isDisabled={false}
              isFocusVisible={false}
              mt="$10"
              width="$21"
              alignSelf="center"
              borderRadius={20}
              onPress={handleSignup}>
              <ButtonText>
                {mode && mode === 'Edit user' ? 'Edit user' : 'Add user'}
              </ButtonText>
            </Button>
          </Card>
        
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

  imagePicker: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e1e1e1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
