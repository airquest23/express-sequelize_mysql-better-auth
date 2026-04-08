//import path from 'path';
//import env from "dotenv";
import { Sequelize } from "sequelize";

/*env.config({
  path: path.join(__dirname, '../../.env')
});*/

const db = new Sequelize(
  process.env.DB_DATABASE || "",
  process.env.DB_USERNAME || "",
  process.env.DB_PASSWORD,
  {
    host    : process.env.DB_HOST     || 'localhost',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'test',
    dialect : "mysql"
  }
);

export default db;