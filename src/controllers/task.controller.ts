// controllers/task.controller.ts

import { Request, Response } from "express";
import Task from "../models/task";
import Project from "../models/project";

export const getTasksForProject = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const sort = req.query.sort ? req.query.sort : "id";
  const completed = req.query.completed;
  const direction = req.query.direction ? req.query.direction : "DESC";
  const { projectId } = req.params;

  const project = await Project.findOne({ where: { id: projectId, userId } });
  if (!project) res.status(404).json({ error: "Project not found" });

  const filter: any = { projectId };

  if (completed !== undefined) {
    if (completed === "true") filter.completed = true;
    else if (completed === "false") filter.completed = false;
  }

  const tasks = await Task.findAll({
    where: filter,
    //@ts-ignore
    order: [[sort, direction]],
  });
  res.json(tasks);
};

export const createTask = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const { projectId } = req.params;
  const { title, description, deadline } = req.body;

  const project = await Project.findOne({ where: { id: projectId, userId } });
  if (!project) res.status(404).json({ error: "Project not found" });

  const task = await Task.create(
    {
      title,
      description,
      deadline,
      priority: 2, // default priority
      //@ts-ignore
      projectId: project.id,
      userId,
    },
    { logging: console.log }
  );

  res.status(201).json(task);
};

export const updateTask = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const { id } = req.params;
  const { title, description, completed, deadline, priority } = req.body;

  const task = await Task.findOne({ where: { id, userId } });
  if (task === null) res.status(404).json({ error: "Task not found" });
  //@ts-ignore
  if (title !== undefined) task.title = title;
  //@ts-ignore
  if (description !== undefined) task.description = description;
  //@ts-ignore
  if (completed !== undefined) task.completed = completed;
  //@ts-ignore
  if (deadline !== undefined) task.deadline = deadline;
  //@ts-ignore
  if (priority !== undefined) task.priority = priority;
  //@ts-ignore
  await task.save();
  res.json(task);
};

export const deleteTask = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const { id } = req.params;

  const task = await Task.findOne({ where: { id, userId } });
  if (!task) res.status(404).json({ error: "Task not found" });
  //@ts-ignore
  await task.destroy();
  res.json({ message: "Task deleted" });
};
