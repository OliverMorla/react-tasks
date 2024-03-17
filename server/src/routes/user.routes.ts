// Libraries
import express from "express";
import * as dotenv from "dotenv";
import { validationResult } from "express-validator";

// Controllers
import {
  createUser,
  deleteUser,
  getUserByID,
  updateUser,
} from "../controllers/user.controller";
import { createUserValidator } from "../utils/validators";

// Load environment variables
dotenv.config({
  path: ".env",
});

// Create a router
const userRouter = express.Router();

// Define routes
userRouter.get("/:id", getUserByID); // GET /user/:id - Get a user by ID
userRouter.delete("/:id", deleteUser); //DELETE  /user/:id - Delete a user by ID
userRouter.post("/", createUserValidator, createUser); // POST /user - Create a user
userRouter.put("/:id", createUserValidator, updateUser); //PUT /user - Update a user

// Export the router
export default userRouter;
