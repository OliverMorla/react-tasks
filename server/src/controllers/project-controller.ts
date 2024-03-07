import type { Request, Response } from "express";

const getProjects = async (req: Request, res: Response) => {};
const getProjectByID = async (req: Request, res: Response) => {};
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
