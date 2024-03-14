import type { NextFunction, Request, Response } from "express";
import prisma from "../lib/prisma";

const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany();

    if (projects) {
      res.status(200).json({
        ok: true,
        message: "Projects retrieved successfully",
        data: projects,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err instanceof Error ? err.message : null,
      message: "Error retrieving projects",
    });
  }
};

const getProjectByID = async (req: Request, res: Response) => {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!project) {
      res.status(200).json({
        ok: false,
        message: "Project not found",
        data: project,
      });
    }

    res.status(200).json({
      ok: true,
      message: "Project retrieved successfully",
      data: project,
    });
    
  } catch (err) {
    res.status(500).json({
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
