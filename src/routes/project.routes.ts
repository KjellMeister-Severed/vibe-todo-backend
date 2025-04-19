// routes/project.routes.ts
import { Router } from "express";
import {
  getAllProjects,
  createProject,
  getProjectById,
  deleteProject,
  updateProject,
} from "../controllers/project.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.use(authMiddleware);

router.get("/", getAllProjects);
router.post("/", createProject);
router.get("/:id", getProjectById);
router.delete("/:id", deleteProject);
router.patch("/:id", updateProject);

export default router;
