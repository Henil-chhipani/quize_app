import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text, Card, Heading } from '@gluestack-ui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Report = ({ navigation }:any) => {
  const [score, setScore] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const storedScore = await AsyncStorage.getItem('score');
        const storedQuestions = await AsyncStorage.getItem('questions');
        const storedSelectedAnswers = await AsyncStorage.getItem('selectedAnswers');
        if (storedScore !== null) {
          setScore(JSON.parse(storedScore));
        }
        if (storedQuestions !== null) {
          setQuestions(JSON.parse(storedQuestions));
        }
        if (storedSelectedAnswers !== null) {
          setSelectedAnswers(JSON.parse(storedSelectedAnswers));
        }
      } catch (error) {
        console.log('Error fetching results:', error);
        Alert.alert('Error', 'Failed to load results');
      }
    };

    fetchResults();
  }, []);

  const renderQuestion = (question:any, index:any) => {
    return (
      <Card key={index} style={styles.card}>
        <Heading>{question.question}</Heading>
        <Text>Correct Answer: {question.answer}</Text>
        <Text>Your Answer: {selectedAnswers[question.id]}</Text>
      </Card>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.score}>Your score is: {score}/{questions.length}</Text>
      {questions.map((question, index) => renderQuestion(question, index))}
    </ScrollView>
  );
};

export default Report;

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
  score: {
    
    fontSize: 24,
    fontWeight: 'bold',
    
  },
});
