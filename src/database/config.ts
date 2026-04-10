import { Sequelize } from "sequelize";

const db = new Sequelize(
  process.env.DB_DATABASE || "",
  process.env.DB_USERNAME || "",
  process.env.DB_PASSWORD,
  {
    host    : process.env.DB_HOST     || 'localhost',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'test',
    // @ts-ignore
    dialect : process.env.DB_DIALECT || 'mysql',
  }
);

export default db;