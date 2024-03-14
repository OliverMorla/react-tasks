// Libraries
import express from "express";
import * as dotenv from "dotenv";

// Controllers
import {
  createProject,
  deleteProject,
  getProjectByID,
  getProjects,
  updateProject,
} from "../controllers/project.controller";

// Load environment variables
dotenv.config({
  path: ".env",
});

// Create a router
const projectsRouter = express.Router();

// Define routes
projectsRouter.get("/", getProjects); // GET /projects - Get all projects

// Export the router
export default projectsRouter;
