import sqlite3 from "sqlite3";
import USER_QUERIES from "./queries/userQueries";

const DB_SOURCE = "db.sqlite";

export default function setupDb() {
  const db = new sqlite3.Database(DB_SOURCE, (err) => {
    if (err) {
      console.log(err.message);
      throw err;
    }

    console.log("connected to database");
  });

  db.serialize(() => {
    db.run(USER_QUERIES.SETUP.CREATE_TABLE);
  });

  db.close();
}
