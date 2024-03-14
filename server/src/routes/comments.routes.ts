// Libraries
import express from "express";
import * as dotenv from "dotenv";

// Controllers
import { getComments } from "../controllers/comment.controller";

// Load environment variables
dotenv.config({
  path: ".env",
});

const commentsRouter = express.Router();

// Define routes
commentsRouter.get("/", getComments);

export default commentsRouter;
