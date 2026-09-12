
import express from "express"
import path from "node:path"
import fs from "fs"
import { getProjectRoot } from "../root"
import { createLog } from "../files"

export const serveStaticFiles = (dirPath : string) => {

    const fullPath = path.join(getProjectRoot(), dirPath);
    if(!fs.existsSync(fullPath)) {
        createLog("WARN", "Static files dir not found: " + dirPath);
    }
    return express.static(fullPath);
}