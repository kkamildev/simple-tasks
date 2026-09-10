import { nanoid } from "nanoid";
import { getTasks, setTasks } from "../mock";
import { asyncWrap } from "../utils/handlers";
import { ErrorType } from "../utils/types";


// GET
export const tasks = asyncWrap(async (req, res) => {
    const {sortby} = req.query;

    const tasks = getTasks();
    if(sortby == "priority") {
        tasks.sort((a, b) => b.priority - a.priority);
    } else {
        tasks.sort((a, b) => a.deadline.getTime() - b.deadline.getTime());
    }
    res.status(200).json({tasks})
})

// POST
export const createTask = asyncWrap(async (req, res) => {
    const {title, content, deadline, priority} = req.body;

    const task = {
        id:nanoid(),
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
    const {id, title, content, deadline, priority} = req.body;

    const task = getTasks().find((obj) => obj.id === id);
    if(task) {
        task.content = content;
        task.title = title;
        task.deadline = deadline;
        task.priority = priority;
        res.send(200).json({success:true})
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
    const {id} = req.body;
    setTasks(getTasks().filter((obj) => obj.id !== id));
    res.status(200).json({success:true})
})