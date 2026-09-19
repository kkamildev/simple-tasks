import { SendMailOptions } from "nodemailer"



export const genVerificationEmail = (to : string, code : string, expireDate : Date) : SendMailOptions => {
    return {
        from:"Simple Tasks",
        to,
        subject:"Email Verification",
        html:`
        <h1 style="text-align:center; font-weight:bold;">Hello new user</h1>
        <p style="text-align:center">This is code for account registration</p>
        <p style="text-align:center">Code will expire at ${expireDate.toLocaleDateString()} ${expireDate.toLocaleTimeString()}</p>
        <h2 style="text-align:center">${code}</h2>
        `
    }
}