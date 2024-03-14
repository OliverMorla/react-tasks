// Libraries
import express from "express";
import * as dotenv from "dotenv";

// Controllers
import { getUsers } from "../controllers/user.controller";

// Load environment variables
dotenv.config({
  path: ".env",
});

// Create a router
const tasksRouter = express.Router();

// Define routes
tasksRouter.get("/", getUsers); // GET /users - Get all users

// Export the router
export default tasksRouter;
