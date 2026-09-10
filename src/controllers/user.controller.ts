import { customAlphabet, nanoid } from "nanoid";
import { getEmailVerifications, getUsers, setEmailVerifications, setUsers } from "../mock";
import bcrypt from "bcrypt"
import { asyncWrap } from "../utils/handlers";
import { AuthRequest, ErrorType } from "../utils/types";
import { auth, clearAccessToken, createRefreshToken } from "../utils/auth";


interface UserPayload {
    id:string,
}


// GET
export const emailAvailable = asyncWrap(async (req, res) => {
    const {email} = req.query;
    const emailExist = getUsers().map((user) => user.email).includes(email as string);
    if(emailExist) {
        const error : ErrorType = {
            title:"That email already exist",
            type:"CONFLICT_ERROR"
        }
        return res.status(409).json(error);
    }
    res.status(200).json({available:false})
});

// GET
export const logout = asyncWrap(async (req, res) => {
    res.clearCookie("REFRESH_TOKEN");
    clearAccessToken(res);
    res.status(200).json({success:true});
})

// POST
export const register = asyncWrap(async (req, res) => {
    const {email, password} = req.body;
    const emailExist = getUsers().map((user) => user.email).includes(email as string);
    if(emailExist) {
        const error : ErrorType = {
            title:"That email already exist",
            type:"CONFLICT_ERROR"
        }
        return res.status(409).json(error);
    }
    const verified = getEmailVerifications().find((obj) => obj.verified && obj.email === email);
    if(verified) {
        setEmailVerifications([...getEmailVerifications().filter((obj) => obj != verified)]);
        const hashedPassword = await bcrypt.hash(password, process.env.SALT_ROUNDS || "12");
        const id = nanoid();
        setUsers([...getUsers(), {
            id,
            email,
            password:hashedPassword
        }])
        createRefreshToken<UserPayload>(res, {id}, 3600 * 24 * 7);
        res.status(201).json({registered:true})
    } else {
        const code = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", 6)();
        // TODO: code send operation by email
        const hashedCode = await bcrypt.hash(code, process.env.SALT_ROUNDS || "12");
        setEmailVerifications([...getEmailVerifications().filter((obj) => obj.email != email), {
            email,
            expirationDate:new Date(Date.now() + 5 * 60 * 1000),
            code: hashedCode,
            verified:false
        }])
        res.send(200).json({emailSent:true});
    }
});

// POST
export const login = asyncWrap(async (req, res) => {
    const {email, password} = req.body;
    const user = getUsers().find((user) => user.email === email && bcrypt.compareSync(password, user.password));
    if(user) {
        createRefreshToken<UserPayload>(res, {id:user.id}, 3600 * 24 * 7);
        res.status(200).json({success:true})
    } else {
        const error : ErrorType = {
            title:"Invalid login info",
            type:"AUTH_ERROR"
        }
        res.send(403).json(error);
    }
});

// POST
export const verifyEmail = asyncWrap(async (req, res) => {
    const {email, code} = req.body;
    const record = getEmailVerifications().find((obj) => obj.email == email && bcrypt.compareSync(code, obj.code) && obj.expirationDate < new Date());
    if(!record) {
        const error : ErrorType = {
            title:"Verification failed",
            type:"AUTH_ERROR"
        }
        res.status(403).json(error);
    } else {
        record.verified = true;
        res.status(200).json({success:true})
    }
});

// PUT
export const updateEmail = asyncWrap(async (req, res) => {
    const authReq = req as AuthRequest<UserPayload>;
    const {email} = req.body;

    const user = getUsers().find((obj) => obj.id === authReq.auth.id);
    if(user) {
        user.email = email;
        res.send(200).json({success:true})
    } else {
        const error : ErrorType = {
            title:"User not found",
            type:"NOT_FOUND"
        }
        res.status(404).json(error)
    }
});

// PUT
export const updatePassword = asyncWrap(async (req, res) => {
    const authReq = req as AuthRequest<UserPayload>;
    const {newPassword} = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, process.env.SALT_ROUNDS || "12")

    const user = getUsers().find((obj) => obj.id === authReq.auth.id);
    if(user) {
        user.password = hashedPassword;
        res.send(200).json({success:true})
    } else {
        const error : ErrorType = {
            title:"User not found",
            type:"NOT_FOUND"
        }
        res.status(404).json(error)
    }
});