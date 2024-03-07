import type { NextFunction, Request, Response } from "express";
import express from "express";
import {
  createProject,
  deleteProject,
  getProjectByID,
  getProjects,
  updateProject,
} from "../controllers/project-controller";

const projectRouter = express.Router();

export default projectRouter;
