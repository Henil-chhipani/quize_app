import { View, Text, Alert } from 'react-native'
import React, { createContext, useContext, useState } from 'react'
import { addResult, addUser, getQuestions, getResult, getUser, updateUser, resetResult } from '../db/databaseService'

const userContext = createContext<any>(null)

const PersonLogo = require('../assets/person-logo.png');

const UserContextProvider = ({ children }: any) => {
    const [questions, setQuestions] = useState<any[]>([])
    const [results, setResults] = useState<any[]>([])
    const [user, setUser] = useState({
        id: -1,
        username: '',
        phone_no: '',
        password: '',
        image: PersonLogo
    })

    const insertUser = async (userDetails: any) => {
        const result = await addUser(userDetails.username, userDetails.phone_no, userDetails.password, userDetails.image)
        if (result && result.length > 0 && result[0].rowsAffected > 0) {
            Alert.alert('Success', 'User added successful')
            return true
        } else {
            Alert.alert('Failed', 'Failed to add user')
            return false
        }
    }

    const getUserDetails = async (user_id: number) => {
        const result = await getUser(user_id)
        if (result && result.length > 0 && result[0].rows.length > 0) {
            setUser(result[0].rows.item(0))
        }else {
            Alert.alert('Failed', 'Failed to get user details')
        }
    }

    const updateUserDetails = async (userDetails: any) => {
        const result = await updateUser(user.id, userDetails.username, userDetails.phone_no, userDetails.password, userDetails.image)
        if (result && result.length > 0 && result[0].rowsAffected > 0) {
            Alert.alert('Success', 'User updated successful')
            return true
        } else {
            Alert.alert('Failed', 'Failed to update user details')
            return false
        }
    }

    const getQuestionList = async () => {
        const result = await getQuestions()
        if (result && result.length > 0 && result[0].rows.length > 0) {
            let questionList = [];
            for (let i = 0; i < result[0].rows.length; i++) {
                questionList.push(result[0].rows.item(i))
            }
            setQuestions(questionList);
        }
    }

    const getResultDetails = async (user_id: number) => {
        const result = await getResult(user_id)
        if (result && result.length > 0 && result[0].rows.length > 0) {
            let resultList = [];
            for (let i = 0; i < result[0].rows.length; i++) {
                resultList.push(result[0].rows.item(i))
            }
            setResults(resultList);
        }
    }

    const addResultEntry = async (que_id: number, user_id: number, status: number) => {
        const result = await addResult(que_id, user_id, status)
        if (result && result.length > 0 && result[0].rowsAffected <= 0) {
            Alert.alert('Failed', 'Failed to record entry')
            return false
        }
    }

    const resetQuiz = async (user_id: number) => {
        const result = await resetResult(user_id)
        if (result && result.length > 0) {
            if(result[0].rowsAffected > 0) {
                Alert.alert('Success', 'Quiz reset completed')
            }else {
                Alert.alert('Failed', 'Attempt quiz to reset')
            }
        } else {
            Alert.alert('Failed', 'Failed to reset quiz')
        }
    }

    return (
        <userContext.Provider value={{ resetQuiz, insertUser, getUserDetails, user, setUser, updateUserDetails, setResults, questions, getQuestionList, addResultEntry, getResultDetails, results }}>
            {children}
        </userContext.Provider>
    )
}

const useUserContext = () => {
    if (!userContext) {
        console.error("userContext only can be used within UserContextProvider")
        return null;
    }
    return useContext(userContext);
}

export { userContext, UserContextProvider, useUserContext }