import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';

interface DatabaseContextType {
  db: SQLite.SQLiteDatabase | null;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

let dbInstance: SQLite.SQLiteDatabase | null = null;

const openDatabase = async (): Promise<SQLite.SQLiteDatabase | { transaction: () => { executeSql: () => void } } | null> => {
  if (Platform.OS === 'web') {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync("db.db");
    await dbInstance.withTransactionAsync(async () => {
      if(dbInstance) {
        await dbInstance?.runAsync(
          `CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, description TEXT NOT NULL, priority TEXT NOT NULL, done INTEGER NOT NULL);`
        );
      }
    });
  }

  return dbInstance;
};

// Create a provider component
interface DatabaseProviderProps {
  children: ReactNode;
}

export const DatabaseProvider: React.FC<DatabaseProviderProps> = ({ children }) => {
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);

  useEffect(() => {
    const initDb = async () => {
      const database = await openDatabase() as SQLite.SQLiteDatabase;
      setDb(database);
    };

    initDb();
  }, []);

  return (
    <DatabaseContext.Provider value={{ db }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = (): DatabaseContextType => {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};
