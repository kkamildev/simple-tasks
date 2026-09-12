import { body, query } from "express-validator";
import { validate } from "../utils/handlers/validate";


export const emailAvailableValidator = [
    query("email").notEmpty().withMessage("required"),
    validate
]

export const registerValidator = [
    body("email").notEmpty().withMessage("required").isEmail().withMessage("invalid email format").isLength({max:50}).withMessage("too long"),
    body("password").notEmpty().withMessage("required").isLength({min:8}).withMessage("too short"),
    validate
]

export const loginValidator = [
    body("email").notEmpty().withMessage("required"),
    body("password").notEmpty().withMessage("required"),
    validate
]

export const verifyEmailValidator = [
    body("email").notEmpty().withMessage("required"),
    body("code").notEmpty().withMessage("required"),
    validate
]

export const updateEmailValidator = [
    body("email").notEmpty().withMessage("required").isEmail().withMessage("invalid format").isLength({max:50}).withMessage("too long"),
    validate
]
export const updatePasswordValidator = [
    body("password").notEmpty().withMessage("required").isLength({min:8}).withMessage("too short"),
    validate
]