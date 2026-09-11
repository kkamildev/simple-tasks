import nodemailer, { Mail, SMTPSentMessageInfo } from "nodemailer";
import { SendMailOptions } from "nodemailer";
import { createLog } from "../files";


let transporter: Mail<SMTPSentMessageInfo>;

export const prepareTransporter = () => {

    if(!process.env.MAIL_HOST) {
        createLog("WARN", "No specified MAIL_HOST");
    }
    if(!process.env.MAIL_PORT) {
        createLog("WARN", "No specified MAIL_PORT");
    }
    if(!process.env.MAIL_USER) {
        createLog("WARN", "No specified MAIL_USER");
    }
    if(!process.env.MAIL_PASSWORD) {
        createLog("WARN", "No specified MAIL_USER");
    }

    transporter = nodemailer.createTransport({
        host:process.env.MAIL_HOST,
        port:process.env.MAIL_PORT,
        secure:process.env.MAIL_SECURE ? true : false,
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASSWORD || ""
        }
    });
}

export const sendEmail = async (data : SendMailOptions) => {
    try {
        const info = await transporter.sendMail(data);
        createLog("OK", "Email sent, ID: " + info.messageId);
    } catch (err) {
        createLog("ERROR", "Email sending failed: " + err);
    }
}