import type { Request, Response } from "express";
import { WhereFilterProps, WhereFilterValue } from "../types";
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
      return res.status(200).json({
        ok: true,
        message: "Task not found",
        data: task,
      });
    }

    return res.status(200).json({
      ok: true,
      message: "User retrieved successfully",
      data: task,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error retrieving task",
      error: err instanceof Error ? err.message : null,
    });
  }
};

const getTasksByEmbeddedQuery = async (req: Request, res: Response) => {
  const query = req.query;

  let whereFilter: WhereFilterProps = {};
  for (const [key, value] of Object.entries(query)) {
    whereFilter[key] = value as WhereFilterValue;
  }

  try {
    const tasks = await prisma.task.findMany({
      where: Object.keys(query).length === 0 ? { id: null } : whereFilter,
      include: {
        user: {
          select: {
            name: true,
            email: true,
            photoUrl: true,
            id: true,
          },
        },
        comments: {
          include: {
            user: {
              select: {
                name: true,
                photoUrl: true,
                id: true,
                email: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!tasks) {
      return res.status(404).json({
        ok: false,
        message: "Tasks not found",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Tasks found",
      data: tasks,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error retrieving tasks",
      error: err instanceof Error ? err.message : null,
    });
  }
};
const createTask = async (req: Request, res: Response) => {};
const updateTask = async (req: Request, res: Response) => {};
const deleteTask = async (req: Request, res: Response) => {};

export {
  getTasks,
  getTasksByEmbeddedQuery,
  getTaskByID,
  createTask,
  updateTask,
  deleteTask,
};
