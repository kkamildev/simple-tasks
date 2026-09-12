
import { NextFunction, Request, Response } from "express";

import {JwtPayload, verify, sign, SignOptions} from "jsonwebtoken"
import { AuthRequest } from "../types/AuthRequestType";
import { ErrorType } from "../types";




export const createRefreshToken = <T extends object>(res : Response, payload : T, expireTime : number = 7 * 24 * 60 * 60) => {
    const options: SignOptions = {
        expiresIn: expireTime
    };
    const token = sign(payload, process.env.REFRESH_TOKEN_SECRET || "HHhbhvjjbioL", options);
    return res.cookie("REFRESH_TOKEN", token,
        {
            maxAge:expireTime * 1000,
            httpOnly:true,
            sameSite:"strict",
            signed:true,
            secure:process.env.HTTPS == "true"
        });
}

export const clearAccessToken = (res : Response) => {
    res.setHeader("X-New-Access-Token", "");
}

export const auth = <T extends JwtPayload>() => {
    const createAccessToken = (req : AuthRequest<T>, res : Response, next : NextFunction) => {
        const authError : ErrorType = {
            title:"Access denied",
            type:"AUTH_ERROR"
        }
        if(req.signedCookies["REFRESH_TOKEN"]) {
            try {
                const decoded = verify(req.signedCookies["REFRESH_TOKEN"], process.env.REFRESH_TOKEN_SECRET || "HHhbhvjjbioL") as T;
                const {iat, exp, nbf, jti, ...sanitizedClaims} = decoded;
                const accessToken = sign(sanitizedClaims, process.env.ACCESS_TOKEN_SECRET || "JHj6hVKkPkj5yTknpLu4A", {
                    expiresIn:"10m"
                });
                res.setHeader("X-New-Access-Token", accessToken);
                req.auth = decoded;
                next();
            } catch (err) {
                res.status(401).json(authError)
            }
        } else {
            res.status(401).json(authError)
        }
    }

    return (req: Request, res: Response, next: NextFunction) => {

        const typedReq = req as AuthRequest<T>

        const authHeader = req.headers.authorization;
        

        if (!authHeader) {
            createAccessToken(typedReq, res, next);
            return;
        }

        const token = authHeader.split(" ")[1];

        try {
            const decoded = verify(
                token,
                process.env.ACCESS_TOKEN_SECRET || "JHj6hVKkPkj5yTknpLu4A"
            ) as T;

            typedReq.auth = decoded;
            next();
        } catch (err) {
            createAccessToken(typedReq, res, next);
        }
    };
}