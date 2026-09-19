import { customAlphabet, nanoid } from "nanoid";
import { getEmailVerifications, getUsers, setEmailVerifications, setUsers } from "../mock";
import bcrypt from "bcrypt"
import { asyncWrap } from "../utils/handlers";
import { AuthRequest, ErrorType } from "../utils/types";
import { clearAccessToken, createRefreshToken } from "../utils/auth";
import { sendEmail } from "../utils/third";
import { genVerificationEmail } from "../third/mailTemplates";
import { EmailVerification, User } from "../models";


export interface UserPayload {
    id:string,
}


// GET
export const emailAvailable = asyncWrap(async (req, res) => {
    const {email} = req.query;

    const emailExist = await User.count({where:{email}})
    
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

// GET
export const autoLogin = asyncWrap(async (req, res) => {
    const authReq = req as AuthRequest<UserPayload>;
    createRefreshToken<UserPayload>(res, { id: authReq.auth.id }, 3600 * 24 * 7);
    res.status(200).json(authReq.auth);
})


// POST
export const register = asyncWrap(async (req, res) => {
    const {email, password} = req.body;
    const emailExist = await User.count({where:{email}})
    if(emailExist) {
        const error : ErrorType = {
            title:"That email already exist",
            type:"CONFLICT_ERROR"
        }
        return res.status(409).json(error);
    }

    const verified = await EmailVerification.count({where:{email, verified:true}})
    if(verified) {
        await EmailVerification.destroy({where:{email}});
        const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS) || 12);
        const id = nanoid();
        const user = await User.create({
            email,
            password:hashedPassword
        })
        createRefreshToken<UserPayload>(res, {id:user.id}, 3600 * 24 * 7);
        res.status(201).json({id:user.id});
    } else {
        const code = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", 6)();
        const expireDate = new Date(Date.now() + 5 * 60 * 1000);
        await sendEmail(genVerificationEmail(email, code, expireDate));
        const hashedCode = await bcrypt.hash(code, Number(process.env.SALT_ROUNDS) || 12);

        await EmailVerification.destroy({where:{email}});
        const emailVerification = await EmailVerification.create({
            email,
            expirationDate:expireDate,
            code: hashedCode,
        })

        res.status(200).json({emailSent:true});
    }
});

// POST
export const login = asyncWrap(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({where:{email}})

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

    return res.status(200).json({id:user.id});
});


// POST
export const verifyEmail = asyncWrap(async (req, res) => {
    const {email, code} = req.body;

    const emailVerification = await EmailVerification.findByPk(email);
    if(!emailVerification) {
        const error : ErrorType = {
            title:"Verification failed",
            type:"AUTH_ERROR"
        }
        return res.status(403).json(error);
    }

    const verified = emailVerification.expirationDate > new Date() && bcrypt.compareSync(code, emailVerification.code);

    if(!verified) {
        const error : ErrorType = {
            title:"Verification failed",
            type:"AUTH_ERROR"
        }
        res.status(403).json(error);
    } else {
        await EmailVerification.update({verified:true}, {where:{email}});
        res.status(200).json({success:true})
    }
});

// PUT
export const updateEmail = asyncWrap(async (req, res) => {
    const authReq = req as AuthRequest<UserPayload>;
    const {email} = req.body;
    const emailExist = await User.count({where:{email}});
    if(emailExist) {
        const [affectedRows] = await User.update({email}, {where:{id:authReq.auth.id}})
        if(affectedRows) {
            res.status(200).json({success:true})
        } else {
            const error : ErrorType = {
                title:"User not found",
                type:"NOT_FOUND"
            }
            res.status(404).json(error)
        }
    } else {
        const error : ErrorType = {
            title:"That email already exist",
            type:"CONFLICT_ERROR"
        }
        return res.status(409).json(error);
    }
});

// PUT
export const updatePassword = asyncWrap(async (req, res) => {
    const authReq = req as AuthRequest<UserPayload>;
    const {password} = req.body;
    const user = await User.findByPk(authReq.auth.id);

    if(user) {
        const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS) || 12);
        await User.update({password:hashedPassword}, {where:{id:authReq.auth.id}});
        res.status(200).json({success:true})
    } else {
        const error : ErrorType = {
            title:"User not found",
            type:"NOT_FOUND"
        }
        res.status(404).json(error)
    }
});