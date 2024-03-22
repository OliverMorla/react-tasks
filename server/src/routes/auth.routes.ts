// Importing necessary libraries
import express from "express";
import * as dotenv from "dotenv";

// Importing validators for handling user input
import { signInUserValidator, signUpUserValidator } from "../utils/validators";

// Importing controllers for handling user-related routes
import { session, signIn, signOut, signUp } from "../controllers/auth.controller";

// Initializing environment variables from the .env file.
// This enables the use of environmental variables throughout the application.
dotenv.config({
  path: ".env", // Specifying the path to the .env file for clarity
});

// Creating a router instance specific for auth-related endpoints.
// This approach modularizes routing and makes the application more maintainable.
const authRouter = express.Router();

// Route definitions
authRouter.post("/login", signInUserValidator, signIn); // POST /auth/login - Logs in a user
authRouter.post("/register", signUpUserValidator, signUp); // POST /auth/register - Registers a new user
authRouter.get("/logout", signOut); // POST /auth/logout - Logs out a user
authRouter.get("/session", session); // GET /auth/session - Get the current session

// Exporting the authRouter to be used in the application's main router.
// This modularization enhances scalability and separation of concerns.
export default authRouter;
