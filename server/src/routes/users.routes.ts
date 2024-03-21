// Importing necessary libraries
import express from "express";
import * as dotenv from "dotenv";

// Importing controller for handling user-related routes
import { getUsers } from "../controllers/user.controller";

// Initializing environment variables from the .env file.
// This enables the use of environmental variables throughout the application.
dotenv.config({
  path: ".env", // Specifying the path to the .env file for clarity
});

// Creating a router instance specific for user-related endpoints.
// This approach modularizes routing and makes the application more maintainable.
const usersRouter = express.Router();

// Define routes
usersRouter.get("/", getUsers); // GET /users - Get all users

// Exporting the usersRouter to be used in the application's main router.
// This modularization enhances scalability and separation of concerns.
export default usersRouter;
