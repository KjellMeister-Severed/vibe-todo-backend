// routes/task.routes.ts
import { Router } from "express";
import {
  getTasksForProject,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.use(authMiddleware);

router.get("/projects/:projectId/tasks", getTasksForProject);
router.post("/projects/:projectId/tasks", createTask);
router.patch("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

export default router;
