
import path from "path";
import fs from "fs";

let cachedRoot: string | null = null;

export const getProjectRoot = () => {
    if (cachedRoot) return cachedRoot;

    let current = __dirname;

    while (!fs.existsSync(path.resolve(current, "package.json"))) {
        current = path.resolve(current, "..");
    }

    cachedRoot = current;
    return cachedRoot;
};
