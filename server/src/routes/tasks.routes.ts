// Libraries
import express from "express";
import * as dotenv from "dotenv";

// Controllers
import { getTasks, getTasksByEmbeddedQuery } from "../controllers/task.controller";

// Load environment variables
dotenv.config({
  path: ".env",
});

// Create a router
const tasksRouter = express.Router();

// Define routes
tasksRouter.get("/", getTasks); // GET /users - Get all users
tasksRouter.get("/query", getTasksByEmbeddedQuery)

// Export the router
export default tasksRouter;
