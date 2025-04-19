// controllers/project.controller.ts
import { Request, Response } from "express";
import Project from "../models/project";
import Task from "../models/task";

export const getAllProjects = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;

  const projects = await Project.findAll({ where: { userId } });
  res.json(projects);
};

export const createProject = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const { name, description } = req.body;

  const project = await Project.create({ name, description, userId });
  res.status(201).json(project);
};

export const getProjectById = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const { id } = req.params;

  const project = await Project.findOne({
    where: { id, userId },
    include: [Task], // includes tasks if needed
  });

  if (!project) res.status(404).json({ error: "Project not found" });

  res.json(project);
};

export const updateProject = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const { id } = req.params;
  const { name, description } = req.body;

  const project = await Project.findOne({ where: { id, userId } });
  if (!project) {
    res.status(404).json({ error: "Project not found" });
  }
  //@ts-ignore
  if (name) project.name = name;
  //@ts-ignore
  if (description) project.description = description;
  //@ts-ignore
  await project.save();
  res.json(project);
};

export const deleteProject = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const { id } = req.params;

  const project = await Project.findOne({ where: { id, userId } });
  if (!project) res.status(404).json({ error: "Project not found" });
  //@ts-ignore
  await project.destroy();
  res.json({ message: "Project deleted" });
};
