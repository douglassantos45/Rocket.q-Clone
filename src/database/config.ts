import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export default () => {
  return open({
    filename: __dirname + '/rocketq.sqlite',
    driver: sqlite3.Database,
  });
};
