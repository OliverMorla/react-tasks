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
const projectRouter = express.Router();

// Define routes
projectRouter.get("/:id", getProjectByID); // GET /project - Get a project by ID
projectRouter.post("/");

// Export the router
export default projectRouter;
