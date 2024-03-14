// Libraries
import express from "express";
import * as dotenv from "dotenv";

// Controllers
import { getUserByID } from "../controllers/user.controller";

// Load environment variables
dotenv.config({
  path: ".env",
});

// Create a router
const userRouter = express.Router();

// Define routes

userRouter.get("/:id", getUserByID); // GET /user/:id - Get a user by ID

// Export the router
export default userRouter;
