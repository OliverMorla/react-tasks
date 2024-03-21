// Importing necessary libraries
import express from "express";
import * as dotenv from "dotenv";

// Importing controller for handling connection-related routes
import { getConnectionByID } from "../controllers/connection.controller";

// Initializing environment variables from the .env file.
// This enables the use of environmental variables throughout the application.
dotenv.config({
  path: ".env", // Specifying the path to the .env file for clarity
});

// Creating a router instance specific for connection-related endpoints.
// This approach modularizes routing and makes the application more maintainable.
const connectionRouter = express.Router();

// Route definitions
connectionRouter.get("/:id", getConnectionByID); // GET /connection/:id - Retrieve a single connection using ID.

// Exporting the connectionRouter to be used in the application's main router.
// This modularization enhances scalability and separation of concerns.
export default connectionRouter;
