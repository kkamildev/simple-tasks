
import { NextFunction, Request, Response } from "express";

import {JwtPayload, verify, sign, SignOptions} from "jsonwebtoken"




export const createRefreshToken = <T extends object>(res : Response, payload : T, expireTime : number = 7 * 24 * 60 * 60) => {
    const options: SignOptions = {
        expiresIn: expireTime
    };
    const token = sign(payload, process.env.REFRESH_TOKEN || "HHhbhvjjbioL", options);
    return res.cookie("REFRESH_TOKEN", token,
        {
            maxAge:expireTime * 1000,
            httpOnly:true,
            sameSite:"strict",
            signed:true,
            secure:process.env.HTTPS == "true"
        });
}


export const Auth = <T extends object>() => {
    return (req : Request, res : Response, next : NextFunction) => {
        const authHeader = req.headers.authorization;

        if (!authHeader) return;

        const token = authHeader.split(" ")[1];

    }
}

// export const userAuth = () => {
//     const createAccessToken = (req : AuthenticatedUserRequest, res : Response, next : NextFunction) => {
//         if(req.signedCookies["USER_REFRESH_TOKEN"]) {
//             try {
//                 const decoded = verify(req.signedCookies["USER_REFRESH_TOKEN"], process.env.REFRESH_TOKEN || "HHhbhvjjbioL") as userPayload;
//                 const {iat, exp, nbf, jti, ...sanitizedClaims} = decoded;
//                 const accessToken = sign(sanitizedClaims, process.env.ACCESS_TOKEN || "JHj6hVKkPkj5yTknpLu4A", {
//                     expiresIn:"10m"
//                 })
//                 res.cookie("USER_ACCESS_TOKEN", accessToken, {
//                     maxAge:1000*60*10,  
//                     httpOnly:true,
//                     signed:true,
//                     secure:process.env.HTTPS == "true",
//                     sameSite:"strict"
//                 });
//                 req.user = decoded;
//                 next();
//             } catch (err) {
//                 res.status(401).json({success:false, unauthorized:true, errorMessage:"Access denied"})
//             }
//         } else {
//             res.status(401).json({success:false, unauthorized:true, errorMessage:"Access denied"})
//         }
//     }
//     return (req: AuthenticatedUserRequest, res : Response, next : NextFunction) => {
//         if(req.signedCookies["USER_ACCESS_TOKEN"]) {
//             try {
//                 const decoded = verify(req.cookies["USER_ACCESS_TOKEN"], process.env.ACCESS_TOKEN || "JHj6hVKkPkj5yTknpLu4A") as userPayload;
//                 req.user = decoded;
//                 next()
//             } catch(err) {
//                createAccessToken(req, res, next);
//             }
//         } else {
//             createAccessToken(req, res, next);
//         }
//     }
// }