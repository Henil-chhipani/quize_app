import { getDbInstance, createTable } from './database';

export const initQuestionTable = async () => {
    const questionTableSchema = `
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question TEXT,
      option1 TEXT,
      option2 TEXT,
      option3 TEXT,
      option4 TEXT,
      answer TEXT
    `;
    await createTable('Questions', questionTableSchema);
  };

  export const insertQustion = async (
    question: string,
    option1: string,
    option2: string,
    option3: string,
    option4: string,
    answer: string,
  ) => {
    try {
      const dbInstance = await getDbInstance();
      await dbInstance.executeSql(
        'INSERT INTO Questions(question, option1, option2, option3, option4, answer) VALUES (?,?,?,?,?,?)',
        [question, option1, option2, option3, option4, answer],
      );
  
      const results = await dbInstance.executeSql(
        'SELECT * FROM Questions WHERE question = ?',
        [question],
      );
  
      if (results[0].rows.length > 0) {
        const Qustion = results[0].rows.item(0);
        console.log('Question inserted successfully:', Qustion);
      } else {
        console.log('Question inserted but not found in database.');
      }
    } catch (error) {
      console.error('Error inserting Qustion:', error);
    }
  };
  
  export const getAllQustions = async () => {
    try {
      const dbInstance = await getDbInstance();
      const results = await dbInstance.executeSql('SELECT * FROM Questions');
      let questions = [];
      for (let i = 0; i < results[0].rows.length; i++) {
        questions.push(results[0].rows.item(i));
      }
      console.log('Questions is : ', questions);
      return questions;
    } catch (error) {
      console.log('Error while fetching Questions data:', error);
      return [];
    }
  };
  
  export const get = async () => {
    const dbInstance = await getDbInstance();
    const results = await dbInstance.executeSql('Truncate table Questions');
    console.log('data: ', results);
  };
  
  export const deleteQustion = async id => {
    try {
      const dbInstance = await getDbInstance();
      await dbInstance.executeSql('DELETE FROM Questions WHERE id = ?', [id]);
      console.log(`question with id ${id} deleted successfully`);
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };    