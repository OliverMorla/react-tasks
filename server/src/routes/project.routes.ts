// Importing necessary libraries
import express from "express";
import * as dotenv from "dotenv";

// Importing controller for handling project-related routes
import {
  createProject,
  deleteProject,
  getProjectByID,
  getProjects,
  updateProject,
} from "../controllers/project.controller";

// Initializing environment variables from the .env file.
// This enables the use of environmental variables throughout the application.
dotenv.config({
  path: ".env", // Specifying the path to the .env file for clarity
});

// Creating a router instance specific for project-related endpoints.
// This approach modularizes routing and makes the application more maintainable.
const projectRouter = express.Router();

// Route definitions
projectRouter.get("/:id", getProjectByID); // GET /project/:id - Get a project by ID
projectRouter.delete("/:id", deleteProject); // DELETE /project/:id - Delete a project by ID
projectRouter.post("/", createProject); // POST /project - Create a project

// Exporting the projectRouter to be used in the application's main router.
// This modularization enhances scalability and separation of concerns.
export default projectRouter;
