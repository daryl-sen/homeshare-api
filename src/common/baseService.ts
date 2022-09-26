import sqlite3 from 'sqlite3';

const DB_SOURCE = "db.sqlite";

export class BaseService {
  constructor() {}

  public runQuery(query: string, values: unknown[]) {
    // type is unknown because it can be a number, string, boolean, etc
    const db = this.openDbConnection();
    const sanitizedParams = this.sanitizeParams(values);

    db.serialize(() => {
      const statement = db.prepare(query);
      statement.run(...sanitizedParams);
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
    });
  }

  private sanitizeParams(values: unknown[]) {
    // TODO: add santization logic
    return values;
  }
}
