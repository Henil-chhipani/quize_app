import { getDbInstance, createTable } from './database';

export const initUserTable = async () => {
    const userTableSchema = `
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      phone TEXT,
      password TEXT,
      image TEXT
    `;
    await createTable('Users', userTableSchema);
  };



export const insertUser = async (
    name: string,
    email: string,
    phone: string,
    password: string,
    image: string,
  ) => {
    try {
      const dbInstance = await getDbInstance();
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



  export const insetAdmin = async () => {
    try {
      const dbInstance = await getDbInstance();
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

  export const getUserByEmailPassword = async (
    email: string,
    password: string,
  ) => {
    try {
      const dbInstance = await getDbInstance();
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
      const dbInstance = await getDbInstance();
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
      const dbInstance = await getDbInstance();
    
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
      const dbInstance = await getDbInstance();
      dbInstance.executeSql('DELETE FROM Users WHERE id = ?', [id]);
      console.log(`User with id ${id} deleted successfully`);
    } catch (error) {
      console.error('Error deleting user: ', error);
    }
  };