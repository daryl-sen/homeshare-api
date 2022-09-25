const USER_QUERIES = {
  SETUP: {
    CREATE_TABLE: `CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY NOT NULL,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      encrypted_password VARCHAR(255) NOT NULL
    );`,
  },
  CREATE_USER: `insert into USERS (
    first_name,
    last_name,
    encrypted_password,
    ) values (
      ?, ?, ?
    );`,
  READ_USER: `SELECT * FROM users
  WHERE users.id=?`,
  UPDATE_USER: `UPDATE users
  SET (
    first_name=?,
    last_name=?,
    encrypted_password =?
  )
  WHERE users.id=?`,
  DELETE_USER: `DELETE FROM users
  WHERE users.id=?`,
};

export default USER_QUERIES;
