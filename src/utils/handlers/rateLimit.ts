
import rateLimit from "express-rate-limit";
import { ErrorType } from "../types";

export const createRateLimit = (requests : number, seconds : number) => rateLimit({
    windowMs: seconds * 1000,
    max: requests,
    handler: (req, res, next, options) => {
        const error : ErrorType = {
            title:"Too many requests",
            type:"RATE_LIMIT_ERROR",
        }
        return res.status(429).json(error);
  }
});