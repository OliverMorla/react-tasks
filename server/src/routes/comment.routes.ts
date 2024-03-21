// Importing necessary libraries
import express from "express";
import * as dotenv from "dotenv";

// Importing controller for handling comment-related routes
import { getCommentByID } from "../controllers/comment.controller";

// Initializing environment variables from the .env file.
// This enables the use of environmental variables throughout the application.
dotenv.config({
  path: ".env", // Specifying the path to the .env file for clarity
});

// Creating a router instance specific for comment-related endpoints.
// This approach modularizes routing and makes the application more maintainable.
const commentRouter = express.Router();

// Route definitions
commentRouter.get("/:id", getCommentByID); // GET /comment/:id - Retrieves a single comment by ID

// Exporting the commentRouter to be used in the application's main router.
// This modularization enhances scalability and separation of concerns.
export default commentRouter;
