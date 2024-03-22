import type { Request, Response } from "express";
import { WhereFilterProps, WhereFilterValue } from "../types";
import { queryOptions } from "../entities";
import prisma from "../lib/prisma";

/**
 * Handles the retrieval of tasks with optional filtering, embedding, and pagination.
 * Allows filtering by any model attribute not explicitly reserved in queryOptions.
 * Supports embedding related models for richer data retrieval.
 *
 * @param req Express request object, containing query parameters for filtering and options.
 * @param res Express response object for sending back the tasks or error messages.
 */
const getTasks = async (req: Request, res: Response) => {
  const { page, limit, embed, include } = req.query;
  let whereFilter: WhereFilterProps = {};

  // Build the filter object from query parameters, excluding reserved options.
  Object.entries(req.query).forEach(([key, value]) => {
    if (!queryOptions.includes(key)) {
      whereFilter[key] = value as WhereFilterValue;
    }
  });

  try {
    const tasks = await prisma.task.findMany({
      where: Object.keys(whereFilter).length > 0 ? whereFilter : {},
      include: {
        project: (embed === "project" && !include) || include === "all",
        user:
          (embed === "user" && !include) || include === "all"
            ? {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  photoUrl: true,
                  role: true,
                },
              }
            : false,
        comments:
          (embed === "comments" && !include) || include === "all"
            ? {
                include: {
                  task: true,
                  user: {
                    select: {
                      id: true,
                      name: true,
                      email: true,
                      photoUrl: true,
                      role: true,
                    },
                  },
                },
              }
            : false,
      },
      skip: page ? parseInt(page as string) * 10 : 0, // Pagination offset calculation.
      take: limit ? parseInt(limit as string) : 10, // Number of items to retrieve.
    });

    if (tasks) {
      // Successful retrieval
      res.status(200).json({
        ok: true,
        message: "Tasks retrieved successfully",
        data: tasks,
      });
    }
  } catch (err) {
    // Error handling
    res.status(500).json({
      message: "Error retrieving tasks",
      error: err instanceof Error ? err.message : null,
    });
  }
};

/**
 * Handles the retrieval of a task by its ID.
 *
 * @param req Express request object, containing the task ID.
 * @param res Express response object for sending back the task or error messages.
 */
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

    // Successful retrieval
    return res.status(200).json({
      ok: true,
      message: "User retrieved successfully",
      data: task,
    });
  } catch (err) {
    // Error handling
    return res.status(500).json({
      message: "Error retrieving task",
      error: err instanceof Error ? err.message : null,
    });
  }
};

const createTask = async (req: Request, res: Response) => {};
const updateTask = async (req: Request, res: Response) => {};
const deleteTask = async (req: Request, res: Response) => {};

export { getTasks, getTaskByID, createTask, updateTask, deleteTask };
