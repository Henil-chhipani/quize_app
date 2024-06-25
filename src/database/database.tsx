import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'quize.db';
const database_version = '1.0';
const database_displayname = 'SQLite quize Database';
const database_size = 200000;

let db: any;

export const initDatabase = async () => {
  try {
    db = SQLite.openDatabase(
      database_name,
      database_version,
      database_displayname,
      database_size,
    );
    console.log('Database opened');
    createTable(
      db,
      'Users',
      `
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      phone TEXT,
      password TEXT,
      image TEXT
    `,
    ); // only this table is cteate qustions table is not cteated and not showing any log

    createTable(
      db,
      'Questions',
      `
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question TEXT,
      option1 TEXT,
      option2 TEXT,
      option3 TEXT,
      option4 TEXT,
      answer TEXT
    `,
    );

    createTable(
      db,
      'Results',
      `id INTEGER PRIMARY KEY AUTOINCREMENT,
      UserId INTEGER,
      Mark TEXT
    `,
    );
  } catch (error) {
    console.error('Error initializing database: ', error);
  }
};

async function createTable(db: any, tableName: any, schema: any) {
  try {
    await db.then(async (tx: any) => {
      await tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${tableName} (${schema})`,
        [],
        () => console.log(`${tableName} table created successfully`),
        (tx: any, error: any) =>
          console.error(`Error creating ${tableName} table:`, error),
      );
    });
  } catch (error) {
    console.error(
      `Error creating ${tableName} table (within transaction):`,
      error,
    );
  }
}

export const insertResult = async (UserId: number, Mark: string) => {
  try {
    const dbInstance = await db;
    const checkAdminResult = await dbInstance.executeSql(
      'INSERT INTO Results(UserId, Mark) VALUES(?,?) ',
      [UserId, Mark],
    );
    console.log('Result inserted successfully');
  } catch (err) {
    console.log('Error in inserting results', err);
  }
};

// Assuming a database instance `db` is already initialized
export const getAllUsersWithMarks = async () => {
  try {
    const dbInstance = await db;
    const results = await dbInstance.executeSql(`
      SELECT Users.id, Users.name, Users.email, Results.Mark
      FROM Users
      LEFT JOIN Results ON Users.id = Results.UserId
    `);
    
    let users = [];
    for (let i = 0; i < results[0].rows.length; i++) {
      users.push(results[0].rows.item(i));
    }
    
    return users;
  } catch (error) {
    console.error('Error fetching users with marks:', error);
    return [];
  }
};


export const insetAdmin = async () => {
  try {
    const dbInstance = await db;
    const checkAdminResult = await dbInstance.executeSql(
      'SELECT * FROM Users WHERE name = ?',
      ['admin'],
    );
    if (checkAdminResult[0].rows.length === 0) {
      await dbInstance.executeSql(
        'INSERT INTO Users (name, email, phone, password, image) VALUES (?, ?, ?, ?, ?)',
        ['admin', 'admin@admin.com', '123', '123', null],
      );
      console.log('Admin inserted successfully');
    } else {
      console.log('Admin already exists');
    }
  } catch (err) {
    console.error('Error inserting admin:', err);
  }
};

export const insertUser = async (
  name: string,
  email: string,
  phone: string,
  password: string,
  image: string,
) => {
  try {
    const dbInstance = await db;
    console.log('db instance', dbInstance);
    await dbInstance.executeSql(
      'INSERT INTO Users (name, email, phone, password,image) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone, password, image],
    );

    const results = await dbInstance.executeSql(
      'SELECT * FROM Users WHERE email = ?',
      [email],
    );

    if (results[0].rows.length > 0) {
      const user = results[0].rows.item(0);
      console.log('User inserted successfully:', user);
    } else {
      console.log('User inserted but not found in database.');
    }
  } catch (error) {
    console.error('Error inserting user: ', error);
  }
};

export const getUserByEmailPassword = async (
  email: string,
  password: string,
) => {
  try {
    const dbInstance = await db;
    const results = await dbInstance.executeSql(
      'SELECT * FROM Users WHERE email = ? AND password = ?',
      [email, password],
    );
    if (results[0].rows.length > 0) {
      return results[0].rows.item(0);
    } else {
      console.log('User not found');
      return null;
    }
  } catch (error) {
    console.error('Error getting user: ', error);
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const dbInstance = await db;
    const results = await dbInstance.executeSql('SELECT * FROM Users');
    let users = [];
    for (let i = 0; i < results[0].rows.length; i++) {
      users.push(results[0].rows.item(i));
    }

    return users;
  } catch (error) {
    console.error('Error fetching users: ', error);
    return [];
  }
};

export const updateUser = async (
  name: string,
  email: string,
  phone: string,
  password: string,
  image: string,
  id: number,
) => {
  try {
    const dbInstance = await db;
    console.log('db instance', dbInstance);
    await dbInstance.executeSql(
      'UPDATE Users  SET name = ?, email = ?, phone = ?, password = ?, image = ? WHERE id = ?',
      [name, email, phone, password, image, id],
    );

    const results = await dbInstance.executeSql(
      'SELECT * FROM Users WHERE email = ?',
      [email],
    );

    if (results[0].rows.length > 0) {
      const user = results[0].rows.item(0);
      console.log('User Updated successfully:', user);
    } else {
      console.log('User Updated but not found in database.');
    }
  } catch (error) {
    console.error('Error Updateing user: ', error);
  }
};

export const deleteUser = async (id: any) => {
  try {
    const dbInstance = await db;
    dbInstance.executeSql('DELETE FROM Users WHERE id = ?', [id]);
    console.log(`User with id ${id} deleted successfully`);
  } catch (error) {
    console.error('Error deleting user: ', error);
  }
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
    const dbInstance = await db;
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
    const dbInstance = await db;
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
  const dbInstance = await db;
  const results = await dbInstance.executeSql('Truncate table Questions');
  console.log('data: ', results);
};

export const deleteQustion = async id => {
  try {
    const dbInstance = await db;
    await dbInstance.executeSql('DELETE FROM Questions WHERE id = ?', [id]);
    console.log(`question with id ${id} deleted successfully`);
  } catch (error) {
    console.error('Error deleting question:', error);
  }
};
