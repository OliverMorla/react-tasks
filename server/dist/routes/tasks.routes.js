"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing necessary libraries
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
// Importing controller for handling task-related routes
const task_controller_1 = require("../controllers/task.controller");
// Initializing environment variables from the .env file.
// This enables the use of environmental variables throughout the application.
dotenv.config({
    path: ".env", // Specifying the path to the .env file for clarity
});
// Creating a router instance specific for task-related endpoints.
// This approach modularizes routing and makes the application more maintainable.
const tasksRouter = express_1.default.Router();
// Route definitions
tasksRouter.get("/", task_controller_1.getTasks); // GET /tasks - Get all tasks
tasksRouter.get("/query", task_controller_1.getTasksByEmbeddedQuery); // GET /tasks/query?key=value - Get task by query
// Exporting the tasksRouter to be used in the application's main router.
// This modularization enhances scalability and separation of concerns.
exports.default = tasksRouter;
