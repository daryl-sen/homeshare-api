import sqlite3 from "sqlite3";
const DB_SOURCE = "db.sqlite";

export class BaseService {
  constructor() {}

  private runQuery(query: string, values: string[]) {
    const db = this.openDbConnection();

    db.serialize(() => {
      const statement = db.prepare(query);
      statement.run(values);
      statement.finalize();
    });

    db.close();
  }

  private openDbConnection() {
    return new sqlite3.Database(DB_SOURCE, (err) => {
      if (err) {
        console.log(err.message);
        throw err;
      }

      console.log("connected to database");
    });
  }
}
