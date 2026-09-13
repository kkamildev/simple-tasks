import { NextFunction, Request, Response } from "express";
import { ErrorType } from "../types";
import cors from "cors"


export const createCorsPolicy = (allowedOrigins : string[], methods : string[] = ["GET", "POST", "PUT", "PATCH", "DELETE"]) => cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    const error = new Error("Origin not allowed");
    error.name = "CorsError";
    return callback(error);
  },
  methods,
  credentials: true
})


export const corsErrorHandler = (err : any, req : Request, res : Response, next : NextFunction) => {
    if (err && err.name === "CorsError") {
        const error : ErrorType = {
            title:"CORS failed",
            type:"CORS_ERROR",
            message: "Origin not allowed by CORS policy",
        }
        return res.status(403).json(error);
    }
    next(err);
}