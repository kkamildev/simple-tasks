import { nanoid } from "nanoid";
import { getTasks, setTasks } from "../mock";
import { asyncWrap } from "../utils/handlers";
import { AuthRequest, ErrorType } from "../utils/types";
import { UserPayload } from "./user.controller";


// GET
export const tasks = asyncWrap(async (req, res) => {
    const typedReq = req as AuthRequest<UserPayload>;
    const {sortby} = req.query;

    const tasks = getTasks().filter((obj) => obj.userId === typedReq.auth.id);
    if(sortby == "priority") {
        tasks.sort((a, b) => b.priority - a.priority);
    } else {
        tasks.sort((a, b) => a.deadline.getTime() - b.deadline.getTime());
    }
    res.status(200).json({tasks})
})

// POST
export const createTask = asyncWrap(async (req, res) => {
    const typedReq = req as AuthRequest<UserPayload>;
    const {title, content, deadline, priority} = req.body;

    const task = {
        id:nanoid(),
        userId:typedReq.auth.id,
        title,
        content,
        createdAt:new Date(),
        deadline:deadline,
        priority
    }
    setTasks([...getTasks(), task])
    res.status(201).json({task})
});

// PUT
export const updateTask = asyncWrap(async (req, res) => {
    const typedReq = req as AuthRequest<UserPayload>;
    const {id, title, content, deadline, priority} = req.body;

    const task = getTasks().filter((obj) => obj.userId === typedReq.auth.id).find((obj) => obj.id === id);
    if(task) {
        task.content = content;
        task.title = title;
        task.deadline = deadline;
        task.priority = priority;
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
    setTasks(getTasks().filter((obj) => obj.id !== id || obj.userId !== typedReq.auth.id));
    res.status(200).json({success:true})
})