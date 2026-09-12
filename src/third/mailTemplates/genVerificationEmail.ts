import { SendMailOptions } from "nodemailer"



export const genVerificationEmail = (to : string, code : string) : SendMailOptions => {
    return {
        from:"Simple Tasks",
        to,
        subject:"Email Verification",
        html:`<h1>Hello new user</h1>
        <p>This is code for account registration</p>
        <h2>${code}</h2>
        `
    }
}