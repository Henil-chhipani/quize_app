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
  import {insertQustion, insertUser, updateUser} from '../../database/database';
  
  export default function AddQustions({navigation, route}: any) {
    const [qustion, setQustion] = useState('');
 const [option1,setOption1] = useState('');
 const [option2,setOption2] = useState('');
 const [option3,setOption3] = useState('');
 const [option4,setOption4] = useState('');
 const [answer,setAnswer] = useState('');
    const [users, setUsers] = useState([]);
    const {mode, item} = route.params;
   
  
    // const handlePhoneNumberChange = text => {
    //   const numericText = text.replace(/[^0-9]/g, '');
    //   setPhoneNumber(numericText);
    // };
  
    // useEffect(() => {
    //   if (route.params && route.params.item) {
    //     const {name, email, phone, password, image} = route.params.item;
    //     setName(name);
    //     setEmail(email);
    //     setPhoneNumber(phone);
    //     setPassword(password);
    //     setImage(image);
    //   }
    // }, [route.params]);
  
    const handleAddQustion = async () => {
      if (qustion && option1 && option2 && option3 && option4) {
     
          await insertQustion(qustion, option1, option2, option3, option4,answer);
          Alert.alert(
            'Success',
            'Qustion addes successfully',
            [
              {
                text: 'OK',
                onPress: () => navigation.navigate('Admin'),
              },
            ],
          );
          console.log('Qustion Added up successfully');
        }
       else {
        console.log('Please fill all fields');
      }
    };
  

  
    return (
      <GluestackUIProvider config={config}>
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.mainContainer}>
            <Card size="lg" variant="elevated" m="$3">
              <Heading mb="$5" fontSize={30} alignSelf="center">
                Add Qustion
              </Heading>
  
             
  
              <Input
                variant="rounded"
                size="lg"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
                mb="$10">
                <InputField
                  placeholder="Enter Qustion here"
                  value={qustion}
                  onChangeText={setQustion}
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
                  value={option1}
                  onChangeText={setOption1}
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
                  value={option2}
                  onChangeText={setOption2}
                  
                />
              </Input>
  
              <Input
                variant="rounded"
                size="lg"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}>
                <InputField
                  placeholder="Enter option 3 here"
                  type="text"
                  value={option3}
                  onChangeText={setOption3}
                  
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
                onPress={handleAddQustion}>
                <ButtonText>
                  Add qustion
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
  