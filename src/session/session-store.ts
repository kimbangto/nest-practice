import MySQLStore from 'express-mysql-session';
import * as expressSession from 'express-session';

const MySQLStoreSession = MySQLStore(expressSession);
const option = {
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
};
export const sessionStore: any = new MySQLStoreSession(option);
