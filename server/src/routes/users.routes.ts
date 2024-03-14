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
const usersRouter = express.Router();

// Define routes
usersRouter.get("/", getUsers); // GET /users - Get all users

// Export the router
export default usersRouter;
