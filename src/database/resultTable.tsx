import { getDbInstance, createTable } from './database';

export const initResultTable = async () => {
    const resultTableSchema = `
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      UserId INTEGER,
      Mark TEXT
    `;
    await createTable('Results', resultTableSchema);
  };

  export const insertResult = async (UserId: number, Mark: string) => {
    try {
      const dbInstance = await getDbInstance();
  
      const res = await dbInstance.executeSql('SELECT * FROM Results WHERE UserId = ?',[UserId])
  if(res[0].rows.length === 0 ){
      await dbInstance.executeSql(
        'INSERT INTO Results(UserId, Mark) VALUES (?, ?) ',
        [UserId, Mark],
      );
      console.log('Result inserted successfully');
    }else{
      await dbInstance.executeSql('UPDATE Results SET Mark = ? WHERE UserId = ?',[Mark, UserId])

      console.log('Result Updated successfully');
    }
  
    } catch (error) {
      console.error('Error inserting or updating result:', error);
    }
  };

  export const result = async ()=>{
    const dbInstance = await getDbInstance();
    const results = await dbInstance.executeSql(`SELECT * from Results`);
    let res = [];
    for (let i = 0; i < results[0].rows.length; i++) {
      res.push(results[0].rows.item(i));
    }
    
    console.log("resyu",res);
  }


  export const getAllUsersWithMarks = async () => {
    try {
      const dbInstance = await getDbInstance();
      const results = await dbInstance.executeSql(`
        SELECT Users.id, Users.name, Users.email, Results.Mark
        FROM Users
        LEFT JOIN Results ON Users.id = Results.UserId
      `);
      
      let users = [];
      for (let i = 0; i < results[0].rows.length; i++) {
        users.push(results[0].rows.item(i));
      }
      console.log(users);
      
      return users;
    } catch (error) {
      console.error('Error fetching users with marks:', error);
      return [];
    }
  };
