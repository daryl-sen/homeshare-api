import sqlite3 from 'sqlite3';

import CLIP_QUERIES from './queries/clipQueries';
import USER_QUERIES from './queries/userQueries';

const DB_SOURCE = "db.sqlite";

const createTables = (db: sqlite3.Database, shouldDropTables?: boolean) => {
  try {
    db.serialize(() => {
      if (shouldDropTables) {
        console.log("dropping tables");
        db.run(USER_QUERIES.SETUP.DROP_TABLE);
        db.run(CLIP_QUERIES.SETUP.DROP_TABLE);
      }

      console.log("creating tables");
      db.run(USER_QUERIES.SETUP.CREATE_TABLE);
      db.run(CLIP_QUERIES.SETUP.CREATE_TABLE);
    });
  } catch (e) {
    console.log(
      "Error creating table, one or more table(s) probably already exists."
    );
    console.log(e);
  }

  db.close();
};

export default function setupDb(shouldFullyReset: boolean) {
  const db = new sqlite3.Database(DB_SOURCE, (err) => {
    if (err) {
      console.log(err.message);
      throw err;
    }

    console.log("connected to database");

    try {
      createTables(db, shouldFullyReset);
    } catch (e) {
      console.log("An error has occurred while creating tables");
    }
  });
}
