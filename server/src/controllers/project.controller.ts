import type { Request, Response } from "express";
import { WhereFilterProps, WhereFilterValue } from "../types";
import { queryOptions } from "../entities";
import prisma from "../lib/prisma";

/**
 * Handles the retrieval of projects with optional filtering, embedding, and pagination.
 * Allows filtering by any model attribute not explicitly reserved in queryOptions.
 * Supports embedding related models for richer data retrieval.
 *
 * @param req Express request object, containing query parameters for filtering and options.
 * @param res Express response object for sending back the projects or error messages.
 */
const getProjects = async (req: Request, res: Response) => {
  const { page, limit, embed, include } = req.query;
  let whereFilter: WhereFilterProps = {};

  // Build the filter object from query parameters, excluding reserved options.
  Object.entries(req.query).forEach(([key, value]) => {
    if (!queryOptions.includes(key)) {
      whereFilter[key] = value as WhereFilterValue;
    }
  });

  try {
    const projects = await prisma.project.findMany({
      where: Object.keys(whereFilter).length > 0 ? whereFilter : {},
      include: {
        tasks: (embed === "tasks" && !include) || include === "all",
        connections:
          (embed === "connections" && !include) || include === "all"
            ? {
                include: {
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
      },
    });

    // Successful retrieval
    if (projects) {
      return res.status(200).json({
        ok: true,
        message: "Projects retrieved successfully",
        data: projects,
      });
    }
  } catch (err) {
    // Error handling
    return res.status(500).json({
      error: err instanceof Error ? err.message : null,
      message: "Error retrieving projects",
    });
  }
};

/**
 * Handles the retrieval of a project by its unique identifier.
 *
 * @param req Express request object, containing the project ID.
 * @param res Express response object for sending back the project or error messages.
 */
const getProjectByID = async (req: Request, res: Response) => {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!project) {
      return res.status(404).json({
        ok: false,
        message: "Project not found",
        data: project,
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Project found",
      data: project,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error retrieving project",
      error: err instanceof Error ? err.message : null,
    });
  }
};

const createProject = async (req: Request, res: Response) => {};
const updateProject = async (req: Request, res: Response) => {};
const deleteProject = async (req: Request, res: Response) => {};

export {
  getProjects,
  getProjectByID,
  createProject,
  updateProject,
  deleteProject,
};
