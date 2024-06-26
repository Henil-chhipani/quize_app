import { Alert, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Card, Heading, View, ScrollView, ButtonText } from '@gluestack-ui/themed';
import { Text } from '@gluestack-ui/themed';
import { getAllQustions } from '../../database/qustionTable';
import { insertResult } from '../../database/resultTable';

import RadioButtonRN from 'radio-buttons-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Quiz = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionsData = await getAllQustions();
        setQuestions(questionsData);
      } catch (error) {
        console.log('Error fetching questions:', error);
        Alert.alert('Error', 'Failed to load questions');
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const calculateScore = async () => {
    let score = 0;
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.answer) {
        score += 1;
      }
    });

    const userData = await AsyncStorage.getItem('user');
    const user = JSON.parse(userData);
    setScore(score);
    await insertResult(user.id, score.toString());
    await AsyncStorage.setItem('score', JSON.stringify(score));
    await AsyncStorage.setItem('selectedAnswers', JSON.stringify(selectedAnswers));
    await AsyncStorage.setItem('questions', JSON.stringify(questions));
    navigation.replace('UserReport');
  };

  const renderQuestion = (question, index) => {
    const options = [
      { label: question.option1, value: question.option1 },
      { label: question.option2, value: question.option2 },
      { label: question.option3, value: question.option3 },
      { label: question.option4, value: question.option4 },
    ];

    return (
      <Card key={index} style={styles.card}>
        <Heading>{question.question}</Heading>
        <RadioButtonRN
          data={options}
          selectedBtn={(e) => handleAnswerSelect(question.id, e.value)}
        />
      </Card>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {questions.map((question, index) => renderQuestion(question, index))}
      <Button onPress={calculateScore} style={styles.button}>
        <ButtonText>Show Result</ButtonText>
      </Button>
    </ScrollView>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    marginVertical: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 16,
    color:'#fff',
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
  },
});
