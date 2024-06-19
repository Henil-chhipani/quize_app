import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'quize.db';
const database_version = '1.0';
const database_displayname = 'SQLite quize Database';
const database_size = 200000;

let db: any;

// export const initDatabase = async () => {
//   try {  
//     db = SQLite.openDatabase(
//       database_name,
//       database_version,
//       database_displayname,
//       database_size,
//     );
//     console.log('Database opened');

//     db.then(tx => {
//       tx.executeSql(
//         'CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, phone TEXT, password TEXT)',
//       );
      
//       tx.executeSql(
//         'CREATE TABLE IF NOT EXISTS Qustions (id INTEGER PRIMARY KEY AUTOINCREMENT, qustion TEXT,opt1 TEXT,opt2 TEXT,opt3 TEXT, opt4 TEXT, answer TEXT)',
//       );
//     });
//     console.log('Table created successfully');
//   } catch (error) {
//     console.error('Error initializing database: ', error);
//   }
// };


export const initDatabase = async () => {
  try {
     db = SQLite.openDatabase(
      database_name,
      database_version,
      database_displayname,
      database_size
    );
    console.log('Database opened');

    db.then(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, phone TEXT, password TEXT)',
        [],
        () => {
          console.log('Users table created successfully');
        },
        (tx, error: any) => {
          console.error('Error creating Users table: ', error);
        }
      );

      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Questions (id INTEGER PRIMARY KEY AUTOINCREMENT, question TEXT, opt1 TEXT, opt2 TEXT, opt3 TEXT, opt4 TEXT, answer TEXT)',
        [],
        () => {
          console.log('Questions table created successfully');
        },
        (tx, error) => {
          console.error('Error creating Questions table: ', error);
        }
      );




    }, (error) => {
      console.error('Transaction error: ', error);
    }, () => {
      console.log('Transaction successful');
    });

  } catch (error) {
    console.error('Error initializing database: ', error);
  }

};


export const insertUser = async (
  name: string,
  email: string,
  phone: string,
  password: string,
) => {
  try {
    const dbInstance = await db;
    console.log("db instance",dbInstance);
    await dbInstance.executeSql(
      'INSERT INTO Users (name, email, phone, password) VALUES (?, ?, ?, ?)',
      [name, email, phone, password],
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
  id: number,) => {
  try {
    const dbInstance = await db;
    console.log('db instance', dbInstance);
    await dbInstance.executeSql(
      'UPDATE Users  SET name = ?, email = ?, phone = ?, password = ? WHERE id = ?',
      [name, email, phone, password, id],
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


export const insertProduct = async (
  productName: any,
  productPrice: any,
  productDis: any,
  productCategory: any,
  productImg: any,
) => {
  try {
    const dbInstance = await db;
    await dbInstance.executeSql(
      'INSERT INTO Qustions(productName, productPrice, productDis, productCategory, productImg) VALUES (?,?,?,?,?)',
      [productName, productPrice, productDis, productCategory, productImg],
    );

    const results = await dbInstance.executeSql(
      'SELECT * FROM Qustions WHERE QustionId = ?',
      [productName],
    );

    if (results[0].rows.length > 0) {
      const product = results[0].rows.item(0);
      console.log('Product inserted successfully:', product);
    } else {
      console.log('Product inserted but not found in database.');
    }
  } catch (error) {
    console.error('Error inserting product:', error);
  }
};


export const getAllProducts = async () => {
  try {
    const dbInstance = await db;
    const results = await dbInstance.executeSql('SELECT * FROM Qustions');
    let products = [];
    for (let i = 0; i < results[0].rows.length; i++) {
      products.push(results[0].rows.item(i));
    }
    console.log('products is : ', products);
    return products;
  } catch (error) {
    console.log('Error while fetching product data:', error);
    return [];
  }
};

export const get = async()=>{
  const dbInstance = await db;
  const results  = await dbInstance.executeSql('Truncate table Qustions')
  console.log("data: ",results);
}

export const deleteProduct = async (id) => {
  try {
    const dbInstance = await db;
    await dbInstance.executeSql('DELETE FROM Qustions WHERE id = ?', [id]);
    console.log(`Product with id ${id} deleted successfully`);
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};