import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import {ModalItem, NoteItem} from '../models';

const tableName1 = 'Models';
const tableName2 = 'Notes';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({name: 'data.db', location: 'default'});
};

export const createTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS "Models" (
    "id"	INTEGER NOT NULL UNIQUE,
    "code"	TEXT UNIQUE,
    "name"	TEXT,
    "type"	TEXT,
    "cost"	INTEGER,
    "category"	TEXT,
    "desc"	TEXT,
    "image"	TEXT,
    PRIMARY KEY("id" AUTOINCREMENT)
  )`;

  const query2 = `CREATE TABLE IF NOT EXISTS "Notes" (
    "id"	INTEGER NOT NULL UNIQUE,
    "by"	TEXT,
    "date"	TEXT,
    "details"	TEXT,
    "type" TEXT,
    "model_id"	INTEGER,
    PRIMARY KEY("id" AUTOINCREMENT),
    FOREIGN KEY("model_id") REFERENCES "Models"("id")
  )`;

  await db.executeSql(query);
  await db.executeSql(query2);
};

export const getModels = async (db: SQLiteDatabase): Promise<ModalItem[]> => {
  try {
    const Items: ModalItem[] = [];
    const results = await db.executeSql(
      `SELECT id, name, code
      type,
      cost,
      category,
      image FROM ${tableName1}`,
    );
    results.forEach((result: any) => {
      for (let index = 0; index < result.rows.length; index++) {
        Items.push(result.rows.item(index));
      }
    });
    return Items;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get Items !!!');
  }
};

export const getOneModel = async (
  db: SQLiteDatabase,
  id: number,
): Promise<ModalItem[]> => {
  try {
    const Items: ModalItem[] = [];
    const results = await db.executeSql(
      `SELECT * FROM ${tableName1} WHERE id=${id}`,
    );
    results.forEach((result: any) => {
      for (let index = 0; index < result.rows.length; index++) {
        Items.push(result.rows.item(index));
      }
    });
    return Items;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get Item !!!');
  }
};

export const getNotes = async (
  db: SQLiteDatabase,
  id: number,
): Promise<NoteItem[]> => {
  try {
    const Items: NoteItem[] = [];
    const results = await db.executeSql(
      `SELECT * FROM ${tableName2} WHERE model_id=${id}`,
    );
    results.forEach((result: any) => {
      for (let index = 0; index < result.rows.length; index++) {
        Items.push(result.rows.item(index));
      }
    });
    return Items;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get Items !!!');
  }
};

export const saveNoteItems = async (db: SQLiteDatabase, Item: NoteItem) => {
  const insertQuery =
    `INSERT INTO ${tableName2}(model_id, by, date, details, type) values` +
    `(${Item.model_id}, '${Item.by}', '${Item.date}', '${Item.details}', '${Item.type}')`;
  return db.executeSql(insertQuery);
};

export const saveModelItems = async (
  db: SQLiteDatabase,
  Items: ModalItem[],
) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName1}(id, name, code, type, cost, category,image) values` +
    Items.map(
      i =>
        `(${i.id}, '${i.name}', '${i.code}', '${i.type}', ${i.cost}, '${i.category}', '${i.image}')`,
    ).join(',');

  return db.executeSql(insertQuery);
};
