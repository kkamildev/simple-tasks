import { Request, Response } from "express";

import fs from "fs"
import path from "path";
import { getProjectRoot } from "../root";
import { createLog } from "../files";


export const notFoundHandler = (defaultFile : string = "app/dist/index.html") => {
    return (req : Request, res : Response) => {
        const specifiedPath = path.join(getProjectRoot(), defaultFile)
        if(fs.existsSync(specifiedPath)) {
            res.sendFile(specifiedPath);
        } else {
            createLog("WARN", "Default route file not found: " + defaultFile);
            res.status(404).end("<h1>404</h1>")
        }
    }
}