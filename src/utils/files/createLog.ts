import path from "path";
import fs from "fs"
import { appendFile } from "node:fs/promises";
import { formatDate } from "../helpers";

type LogName = "ERROR" | "WARN" | "OK";

export const createLog = async (logName : LogName, content : string, folderPath : string = "logs") => {
    try {
        const dir = path.join(__dirname, "..", "..", "..", folderPath);
        if(!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    
        const logPath = path.join(dir, `log-${(new Date()).toISOString().slice(2, 10)}.txt`);

        const logContent = `[${formatDate(new Date())}] ${logName} -> ${content}`;
        if(process.env.ENABLE_LOGGING) {
            await appendFile(logPath, logContent + "\n");
        }
        console.log(logContent);
    } catch(err) {
        const e = err as Error;
        console.log("Log creation failed: " + e.message);
    }
}