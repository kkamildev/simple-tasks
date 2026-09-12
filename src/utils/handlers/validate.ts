import { NextFunction, Request, Response } from "express";
import {FieldValidationError, ValidationError, validationResult } from "express-validator";
import { ErrorType } from "../types";

function isFieldError(error: ValidationError): error is FieldValidationError {
  return error.type === "field";
}

export const validate = (req : Request, res : Response, next : NextFunction) => {
    const errors = validationResult(req).formatWith((error: ValidationError) => {
        if(isFieldError(error)) {
            return {
                param: error.path,
                message: error.msg,
                value: error.value,
            };
        }

        return {
            param: "",
            message: error.msg,
            value: "",
        };
    });


    if (!errors.isEmpty()) {
        const error : ErrorType = {
            title:"Validation failed",
            type:"VALIDATION_ERROR",
            message:"Invalid Params:    " + errors.array().map((obj) => `<${obj.param}>(${obj.value || ""}) ${obj.message}`).join("   ")
        }
        return res.status(422).json(error);
    }
    next();
};