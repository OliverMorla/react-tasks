// Libraries
import express from "express";
import * as dotenv from "dotenv";

// Controllers
import { getTaskByID } from "../controllers/task.controller";

// Load environment variables
dotenv.config({
  path: ".env",
});

// Create a router
const taskRouter = express.Router();

// Define routes
taskRouter.get("/:id", getTaskByID); // GET /users - Get all users

// Export the router
export default taskRouter;
