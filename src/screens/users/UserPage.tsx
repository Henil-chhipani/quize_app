import { Button, ButtonText, View } from '@gluestack-ui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet } from 'react-native'


const UserPage = ({ navigation, route }: any) => {
    const [user_id, setUserId] = useState(null)

    // const { resetQuiz } = useUserContext()

    const getUserId = async () => {
        if(await AsyncStorage.getItem('user') != null) {
            setUserId(JSON.parse(await AsyncStorage.getItem('user') ?? "").id)
        }
    }

  
    const handleLogout =  ()=>{
        navigation.replace('Login');
      }
    const handleStartQuiz = async () => {
        navigation.navigate('Quiz')
    }



    return (
        
        <View style={styles.container}>
            <Button rounded="$full" w="$2/3" onPress={() => navigation.navigate('Profile', { mode: 'VIEW', id: user_id })}>
                <ButtonText>My Profile</ButtonText>
            </Button>
            <Button rounded="$full" w="$2/3" mt="$5" onPress={handleStartQuiz}>
                <ButtonText>Start Quiz</ButtonText>
            </Button>
            <Button rounded="$full" w="$2/3" mt="$5" onPress={() => navigation.navigate('UserReport', { mode: 'VIEW', id: user_id })}>
                <ButtonText>View Report</ButtonText>
            </Button>
            <Button
          marginVertical={50}
          margin={25}
          borderRadius={15}
          size="sm"
          variant="solid"
          action="negative"
          width={100}
          isDisabled={false}
          onPress={handleLogout}
          isFocusVisible={false}>
          <ButtonText>Logout </ButtonText>
        </Button>
        </View>
    )
}

export default UserPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50
    }
})