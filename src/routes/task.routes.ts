import { Router } from "express";
import { createTask, deleteTask, tasks, updateTask } from "../controllers/task.controller";
import { auth } from "../utils/auth";
import { UserPayload } from "../controllers/user.controller";
import { createTaskValidator, deleteTaskValidator, getTasksValidator, updateTaskValidator } from "../validators";

const router = Router();

// api/tasks

router.use(auth<UserPayload>());

router.get("/", getTasksValidator, tasks);

router.post("/", createTaskValidator, createTask);

router.put("/", updateTaskValidator, updateTask);

router.delete("/", deleteTaskValidator, deleteTask);


export default router;