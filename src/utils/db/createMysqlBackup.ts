import { exec } from "child_process";
import path from "path";
import fs from "fs"
import { createLog } from "../files/createLog";

export const createBackup = (folderPath : string) => {

    try {
        const dir = path.join(__dirname, "..", "..", "..", folderPath);

        if(!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const backupPath = path.join(dir, folderPath, `backup-${(new Date()).toISOString().slice(2, 10)}.sql`);

        let command;
        if(process.env.DB_PASSWORD) {
            command = `mysqldump -u ${process.env.DB_USER || "root"} -p${process.env.DB_PASSWORD} ${process.env.DB_NAME || "e_commerce_db"} > ${backupPath}`;
        } else {
            command = `mysqldump -u ${process.env.DB_USER || "root"} ${process.env.DB_NAME || "e_commerce_db"} > ${backupPath}`;
        }

        exec(command, (err) => {
            if (err) {
                throw err;
            } else {
                createLog("OK", "Backup created in dir -> ", backupPath)
            }
        });
    } catch (err) {
        const e = err as Error;
        createLog("ERROR", `${e.name}: ${e.message}\nError Stack:\n${e.stack}`);
    }
}