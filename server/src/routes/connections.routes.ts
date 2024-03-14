// Libraries
import express from "express";
import * as dotenv from "dotenv";

// Controllers
import { getConnections } from "../controllers/connection.controller";

// Load environment variables
dotenv.config({
  path: ".env",
});

// Create a router
const connectionsRouter = express.Router();

// Define routes
connectionsRouter.get("/", getConnections); // GET /users - Get all connections

// Export the router
export default connectionsRouter;
