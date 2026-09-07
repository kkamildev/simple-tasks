
import mysql from "mysql2/promise"
import { RowDataPacket } from "mysql2"
import { createLog } from "../files/createLog";


const pool = mysql.createPool({
  host:process.env.DB_HOST || "localhost",
  user:process.env.DB_USER || "root",
  password:process.env.DB_PASSWORD || ""
});

export const createMysqlDatabase = async () => {
  try {
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();

    const dbName = process.env.DB_NAME || "e_commerce_db";
    const [rows] = await pool.execute<RowDataPacket[]>("SHOW DATABASES")
    if (rows.some((obj) => obj.Database == dbName)) {
      createLog("OK", "Creation of database skipped");
    } else {
      await pool.execute(`CREATE DATABASE IF NOT EXISTS ${dbName} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`)
      createLog("OK", "database created successfully");
    }
  } catch (err) {
    const e = err as Error;
    createLog("ERROR", `${e.name}: ${e.message}\nError Stack:\n${e.stack}`);
    process.exit(1);
  }

}