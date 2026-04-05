import express from "express";
import { TaskController } from "../controller/task.controller.js";
import { TaskRepository } from "../repository/task.repository.js"
import { TaskService } from "../services/task.service.js"

const router = express.Router();

// Inject dependencies
const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

router.get("/", taskController.getTasks);
router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

export default router;