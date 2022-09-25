import sqlite3 from 'sqlite3';

import USER_QUERIES from './queries/userQueries';

const DB_SOURCE = "db.sqlite";

const createTables = (db: sqlite3.Database) => {
  console.log("Attempting to create tables");

  db.serialize(() => {
    db.run(USER_QUERIES.SETUP.CREATE_TABLE);
  });

  db.close();
};

export default function setupDb() {
  const db = new sqlite3.Database(DB_SOURCE, (err) => {
    if (err) {
      console.log(err.message);
      throw err;
    }

    console.log("connected to database");

    try {
      createTables(db);
    } catch (e) {
      console.log("An error has occurred while creating tables");
    }
  });
}
