const USER_QUERIES = {
  SETUP: {
    CREATE_TABLE: `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY NOT NULL,
      user_name VARCHAR(64) NOT NULL UNIQUE,
      display_name VARCHAR(255) NOT NULL,
      encrypted_password VARCHAR(255) NOT NULL,
      last_login VARCHAR(255) NOT NULL,
      is_admin BOOLEAN NOT NULL
    );`,
    DROP_TABLE: `DROP TABLE IF EXISTS users;`,
  },
  CREATE_USER: `INSERT INTO users (user_name, display_name, encrypted_password, is_admin, last_login) VALUES (?, ?, ?, ?, ?) RETURNING id;`,
  READ_USER: `SELECT * FROM users WHERE users.user_name=?;`,
  READ_USER_BY_ID: `SELECT * FROM users WHERE users.id=?;`,
  // the middle part of this query will be built dynamically in the service
  UPDATE_USER: { START: `UPDATE users SET `, END: ` WHERE users.id=?;` },
  DELETE_USER: `DELETE FROM users
  WHERE id=?;`,
};

export default USER_QUERIES;
