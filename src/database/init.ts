import Database from './config';

const initDB = {
  async init() {
    const sql = await Database();

    await sql.exec(`
      CREATE TABLE rooms(
        id INTEGER PRIMARY KEY,
        pass TEXT
      )
    `);

    await sql.exec(`
        CREATE TABLE questions(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title VARCHAR(255),
          read INT,
          room INT
        )
    `);

    await sql.close();
  },
};

initDB.init();
