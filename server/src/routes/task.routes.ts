// Importing necessary libraries
import express from "express";
import * as dotenv from "dotenv";

// Importing controller for handling task-related routes
import { getTaskByID } from "../controllers/task.controller";

// Initializing environment variables from the .env file.
// This enables the use of environmental variables throughout the application.
dotenv.config({
  path: ".env", // Specifying the path to the .env file for clarity
});

// Creating a router instance specific for task-related endpoints.
// This approach modularizes routing and makes the application more maintainable.
const taskRouter = express.Router();

// Route definitions
taskRouter.get("/:id", getTaskByID); // GET /task/:id - Get a single task by ID

// Exporting the taskRouter to be used in the application's main router.
// This modularization enhances scalability and separation of concerns.
export default taskRouter;
