import type { Request, Response } from "express";
import prisma from "../lib/prisma";

const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany();

    if (tasks) {
      res.status(200).json({
        ok: true,
        message: "Tasks retrieved successfully",
        data: tasks,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving tasks",
      error: err instanceof Error ? err.message : null,
    });
  }
};

const getTaskByID = async (req: Request, res: Response) => {
  try {
    const task = prisma.task.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!task) {
      res.status(200).json({
        ok: true,
        message: "Task not found",
        data: task,
      });
    }

    res.status(200).json({
      ok: true,
      message: "User retrieved successfully",
      data: task,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving task",
      error: err instanceof Error ? err.message : null,
    });
  }
};
const createTask = async (req: Request, res: Response) => {};
const updateTask = async (req: Request, res: Response) => {};
const deleteTask = async (req: Request, res: Response) => {};

export { getTasks, getTaskByID, createTask, updateTask, deleteTask };
