import { Sequelize } from "sequelize";
import config from "../config/config";
import User from "./user";
import Project from "./project";
import Task from "./task";

const env = "development";
const dbConfig = (config as any)[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

export { sequelize, Sequelize };
