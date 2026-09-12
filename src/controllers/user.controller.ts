import { customAlphabet, nanoid } from "nanoid";
import { getEmailVerifications, getUsers, setEmailVerifications, setUsers } from "../mock";
import bcrypt from "bcrypt"
import { asyncWrap } from "../utils/handlers";
import { AuthRequest, ErrorType } from "../utils/types";
import { clearAccessToken, createRefreshToken } from "../utils/auth";
import { sendEmail } from "../utils/third";
import { genVerificationEmail } from "../third/mailTemplates";


export interface UserPayload {
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
    res.status(200).json({available:true})
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
        const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS) || 12);
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
        await sendEmail(genVerificationEmail(email, code));
        const hashedCode = await bcrypt.hash(code, Number(process.env.SALT_ROUNDS) || 12);
        setEmailVerifications([...getEmailVerifications().filter((obj) => obj.email != email), {
            email,
            expirationDate:new Date(Date.now() + 5 * 60 * 1000),
            code: hashedCode,
            verified:false
        }])
        res.status(200).json({emailSent:true});
    }
});

// POST
export const login = asyncWrap(async (req, res) => {
    const { email, password } = req.body;

    const user = getUsers().find(u => u.email === email);

    if (!user) {
        return res.status(403).json({
            title: "Invalid login info",
            type: "AUTH_ERROR"
        });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return res.status(403).json({
            title: "Invalid login info",
            type: "AUTH_ERROR"
        });
    }

    createRefreshToken<UserPayload>(res, { id: user.id }, 3600 * 24 * 7);

    return res.status(200).json({ success: true });
});

// POST
export const verifyEmail = asyncWrap(async (req, res) => {
    const {email, code} = req.body;
    const record = getEmailVerifications().find((obj) => obj.email == email && bcrypt.compareSync(code, obj.code) && obj.expirationDate > new Date());
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
        res.status(200).json({success:true})
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
    const {password} = req.body;
    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS) || 12)

    const user = getUsers().find((obj) => obj.id === authReq.auth.id);
    if(user) {
        user.password = hashedPassword;
        res.status(200).json({success:true})
    } else {
        const error : ErrorType = {
            title:"User not found",
            type:"NOT_FOUND"
        }
        res.status(404).json(error)
    }
});