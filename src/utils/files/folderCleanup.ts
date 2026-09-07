

import fs from "fs/promises"
import path from "path";
import { createLog } from "./createLog";


export const folderCleanup = async (dirPath : string, oldMs: number) => {
  try {
    const thirtyDaysInMs = oldMs;
    const cutoffTime = Date.now() - thirtyDaysInMs;

    const files = await fs.readdir(dirPath);
    let deletedCount = 0;
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stats = await fs.stat(filePath);

      if (!stats.isFile()) continue;

      if (stats.mtimeMs < cutoffTime) {
        await fs.unlink(filePath);
        deletedCount++;
      }
    }
    createLog("OK", "Cleanup process completed successfully. Deleted files: " + deletedCount)
  } catch (err) {
    createLog("ERROR", "Folder cleanup failed")
  }
}