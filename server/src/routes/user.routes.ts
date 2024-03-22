// Importing necessary libraries
import express from "express";
import * as dotenv from "dotenv";

// Importing controller for handling user-related routes
import {
  deleteUser,
  getUserByID,
  updateUser,
} from "../controllers/user.controller";

// Importing user validator for validating user data
import { updateUserValidator } from "../utils/validators";

// Initializing environment variables from the .env file.
// This enables the use of environmental variables throughout the application.
dotenv.config({
  path: ".env", // Specifying the path to the .env file for clarity
});

// Creating a router instance specific for user-related endpoints.
// This approach modularizes routing and makes the application more maintainable.
const userRouter = express.Router();


// Define routes
userRouter.get("/:id", getUserByID); // GET /user/:id - Get a user by ID
userRouter.delete("/", deleteUser); //DELETE  /user/:id - Delete a user by ID
userRouter.put("/", updateUser); //PUT /user/:id - Update a user by ID

// Exporting the userRouter to be used in the application's main router.
// This modularization enhances scalability and separation of concerns.
export default userRouter;
