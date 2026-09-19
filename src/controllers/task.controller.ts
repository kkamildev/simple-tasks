import { nanoid } from "nanoid";
import { getTasks, setTasks } from "../mock";
import { asyncWrap } from "../utils/handlers";
import { AuthRequest, ErrorType } from "../utils/types";
import { UserPayload } from "./user.controller";
import { Task} from "../models";


// GET
export const tasks = asyncWrap(async (req, res) => {
    const typedReq = req as AuthRequest<UserPayload>;
    const {sortBy} = req.query;

    const tasks = await Task.findAll({
        where:{
            userId:typedReq.auth.id
        },
        order:
        sortBy === "priority"
        ? [["priority", "DESC"]]
        : [["deadline", "ASC"]]
    })
    res.status(200).json({tasks})
})

// POST
export const createTask = asyncWrap(async (req, res) => {
    const typedReq = req as AuthRequest<UserPayload>;
    const {title, content, deadline, priority} = req.body;

    const task = await Task.create({
        userId:typedReq.auth.id,
        title,
        content,
        deadline,
        priority
    })
    res.status(201).json({task})
});

// PUT
export const updateTask = asyncWrap(async (req, res) => {
    const typedReq = req as AuthRequest<UserPayload>;
    const {id, title, content, deadline, priority} = req.body;

    const [affectedRows] = await Task.update({title, content, deadline, priority}, {where:{id, userId:typedReq.auth.id}});

    if(affectedRows) {
        res.status(200).json({success:true})
    } else {
        const error : ErrorType = {
            title:"Task not found",
            type:"NOT_FOUND"
        }
        res.status(404).json(error)
    }
});

// DELETE
export const deleteTask = asyncWrap(async (req, res) => {
    const typedReq = req as AuthRequest<UserPayload>;
    const {id} = req.body;

    const deleted = await Task.destroy({where:{id, userId:typedReq.auth.id}})

    if(deleted) {
        res.status(200).json({success:true})
    } else {
        const error : ErrorType = {
            title:"Task not found",
            type:"NOT_FOUND"
        }
        res.status(404).json(error)
    }
})