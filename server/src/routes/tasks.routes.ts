// Importing necessary libraries
import express from "express";
import * as dotenv from "dotenv";

// Importing controller for handling task-related routes
import {
  getTasks,
  getTasksByEmbeddedQuery,
} from "../controllers/task.controller";

// Initializing environment variables from the .env file.
// This enables the use of environmental variables throughout the application.
dotenv.config({
  path: ".env", // Specifying the path to the .env file for clarity
});

// Creating a router instance specific for task-related endpoints.
// This approach modularizes routing and makes the application more maintainable.
const tasksRouter = express.Router();

// Route definitions
tasksRouter.get("/", getTasks); // GET /tasks - Get all tasks
tasksRouter.get("/query", getTasksByEmbeddedQuery); // GET /tasks/query?key=value - Get task by query

// Exporting the tasksRouter to be used in the application's main router.
// This modularization enhances scalability and separation of concerns.
export default tasksRouter;
