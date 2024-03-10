import express from "express";
// import * as dotenv from "dotenv"
import dotenv from "dotenv";
dotenv.config({ path: ".env" }); // Load environment variables
const userRouter = express.Router();

export default userRouter;
