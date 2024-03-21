// Importing necessary libraries
import express from "express";
import * as dotenv from "dotenv";

// Importing controller for handling comment-related routes
import { getComments } from "../controllers/comment.controller";

// Initializing environment variables from the .env file.
// This enables the use of environmental variables throughout the application.
dotenv.config({
  path: ".env", // Specifying the path to the .env file for clarity
});

// Creating a router instance specific for comment-related endpoints.
// This approach modularizes routing and makes the application more maintainable.
const commentsRouter = express.Router();

// Route definitions
commentsRouter.get("/", getComments); // GET /comments - Retrieves all comments.

// Exporting the commentsRouter to be used in the application's main router.
// This modularization enhances scalability and separation of concerns.
export default commentsRouter;
