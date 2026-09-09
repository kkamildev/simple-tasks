import type { Request, Response, NextFunction } from "express";
import { createLog } from "../files/createLog";
import { ErrorType } from "../types";

export function serverErrorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    const status = err.status || 500;
    const title = err.message || "Internal Server Error";
    if(status >= 500) {
        createLog("ERROR", `${status} ${title}`);
    }

    const error : ErrorType = {
        title,
        type:"SERVER_ERROR"
    }

    res.status(status).json(error);
}
