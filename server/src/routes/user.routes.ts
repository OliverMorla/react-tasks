// Libraries
import express from "express";
import * as dotenv from "dotenv";
import { validationResult } from "express-validator";

// Controllers
import { createUser, deleteUser, getUserByID } from "../controllers/user.controller";
import { createValidator, loginValidator } from "../utils/validators";

// Load environment variables
dotenv.config({
  path: ".env",
});

// Create a router
const userRouter = express.Router();

// Define routes
userRouter.get("/:id", getUserByID); // GET /user/:id - Get a user by ID
userRouter.delete("/:id", deleteUser); //DELETE  /user/:id - Delete a user by ID
userRouter.post("/", createValidator, createUser); // POST /user - Create a user

// Export the router
export default userRouter;
