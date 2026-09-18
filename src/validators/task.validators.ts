import { body, query } from "express-validator";
import { validate } from "../utils/handlers/validate";


export const getTasksValidator = [
    query("sortBy").notEmpty().withMessage("required").isIn(["priority", "deadline"]).withMessage("only options <priority, deadline>"),
    validate
]

export const createTaskValidator = [
    body("title").notEmpty().withMessage("required").isLength({max:50}).withMessage("too long"),
    body("content").notEmpty().withMessage("required").isLength({max:2000}).withMessage("too long"),
    body("deadline").notEmpty().withMessage("required").isISO8601().withMessage("invalid date format").toDate(),
    body("priority").notEmpty().withMessage("required").isInt({min:1, max:10}).withMessage("priority must be a numebr between 1 and 10"),
    validate
]

export const updateTaskValidator = [
    body("id").notEmpty().withMessage("required"),
    body("title").notEmpty().withMessage("required").isLength({max:50}).withMessage("too long"),
    body("content").notEmpty().withMessage("required").isLength({max:2000}).withMessage("too long"),
    body("deadline").notEmpty().withMessage("required").isISO8601().withMessage("invalid date format").toDate(),
    body("priority").notEmpty().withMessage("required").isInt({min:1, max:10}).withMessage("priority must be a numebr between 1 and 10"),
    validate
]

export const deleteTaskValidator = [
    body("id").notEmpty().withMessage("required"),
    validate
]