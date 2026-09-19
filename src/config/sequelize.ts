
import { Sequelize } from "sequelize-typescript";
import { EmailVerification, Task, User } from "../models";

export const sequelize = new Sequelize({
    database: process.env.DB_NAME || "simple_tasks_db",
    dialect: "mysql",
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    host: process.env.DB_HOST || "localhost",
    models: [User, EmailVerification, Task],
    logging: false
});