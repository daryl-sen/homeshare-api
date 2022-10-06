const CLIP_QUERIES = {
  SETUP: {
    CREATE_TABLE: `CREATE TABLE IF NOT EXISTS clips (
      id INTEGER PRIMARY KEY NOT NULL,
      user_id INTEGER NOT NULL,
      clip_name VARCHAR(255) NOT NULL,
      encrypted_content TEXT NOT NULL,
      modified_at VARCHAR(255) NOT NULL,
      created_at VARCHAR(255) NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );`,
    DROP_TABLE: `DROP TABLE IF EXISTS clips;`,
  },
  CREATE_CLIP: `INSERT INTO clips (user_id, clip_name, encrypted_content, modified_at, created_at) VALUES (?, ?, ?, ?, ?) RETURNING id;`,
  READ_CLIPS_BY_USER_ID: `SELECT * FROM clips WHERE user_id=?;`,
  READ_CLIP_BY_ID: `SELECT * FROM clips WHERE id=?;`,
  UPDATE_CLIP: `UPDATE clips SET clip_name=?, encrypted_content=?, modified_at=? WHERE id=?;`,
  DELETE_CLIP: `DELETE FROM clips WHERE id=?;`,
};

export default CLIP_QUERIES;
