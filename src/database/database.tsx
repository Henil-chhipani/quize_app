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
    db = await SQLite.openDatabase(
      database_name,
      database_version,
      database_displayname,
      database_size,
    );
    console.log('Database opened');
  } catch (error) {
    console.error('Error initializing database: ', error);
  }
};

export const getDbInstance = async () => {
  if (!db) {
    await initDatabase();
  }
  return db;
};

export const createTable = async (tableName: string, schema: string) => {
  try {
    const dbInstance = await getDbInstance();
    await dbInstance.transaction(async (tx: any) => {
      await tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${tableName} (${schema})`,
        [],
        () => console.log(`${tableName} table created successfully`),
        (tx: any, error: any) =>
          console.error(`Error creating ${tableName} table:`, error),
      );
    });
  } catch (error) {
    console.error(`Error creating ${tableName} table (within transaction):`, error);
  }
};
