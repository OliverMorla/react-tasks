// Importing necessary libraries
import express from "express";
import * as dotenv from "dotenv";

// Importing controller for handling connections-related routes
import { getConnections } from "../controllers/connection.controller";

// Initializing environment variables from the .env file.
// This enables the use of environmental variables throughout the application.
dotenv.config({
  path: ".env", // Specifying the path to the .env file for clarity
});

// Creating a router instance specific for connections-related endpoints.
// This approach modularizes routing and makes the application more maintainable.
const connectionsRouter = express.Router();

// Route definitions
connectionsRouter.get("/", getConnections); // GET /users - Get all connections

// Exporting the connectionsRouter to be used in the application's main router.
// This modularization enhances scalability and separation of concerns.
export default connectionsRouter;
