"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTaskByID = exports.getTasks = void 0;
const entities_1 = require("../entities");
const prisma_1 = __importDefault(require("../lib/prisma"));
/**
 * Handles the retrieval of tasks with optional filtering, embedding, and pagination.
 * Allows filtering by any model attribute not explicitly reserved in queryOptions.
 * Supports embedding related models for richer data retrieval.
 *
 * @param req Express request object, containing query parameters for filtering and options.
 * @param res Express response object for sending back the tasks or error messages.
 */
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, embed, include } = req.query;
    let whereFilter = {};
    // Build the filter object from query parameters, excluding reserved options.
    Object.entries(req.query).forEach(([key, value]) => {
        if (!entities_1.queryOptions.includes(key)) {
            whereFilter[key] = value;
        }
    });
    try {
        const tasks = yield prisma_1.default.task.findMany({
            where: Object.keys(whereFilter).length > 0 ? whereFilter : {},
            include: {
                project: (embed === "project" && !include) || include === "all",
                user: (embed === "user" && !include) || include === "all"
                    ? {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            photoUrl: true,
                            role: true,
                        },
                    }
                    : false,
                comments: (embed === "comments" && !include) || include === "all"
                    ? {
                        include: {
                            task: true,
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                    email: true,
                                    photoUrl: true,
                                    role: true,
                                },
                            },
                        },
                    }
                    : false,
            },
            skip: page ? parseInt(page) * 10 : 0, // Pagination offset calculation.
            take: limit ? parseInt(limit) : 10, // Number of items to retrieve.
        });
        if (tasks) {
            // Successful retrieval
            res.status(200).json({
                ok: true,
                message: "Tasks retrieved successfully",
                data: tasks,
            });
        }
    }
    catch (err) {
        // Error handling
        res.status(500).json({
            message: "Error retrieving tasks",
            error: err instanceof Error ? err.message : null,
        });
    }
});
exports.getTasks = getTasks;
/**
 * Handles the retrieval of a task by its ID.
 *
 * @param req Express request object, containing the task ID.
 * @param res Express response object for sending back the task or error messages.
 */
const getTaskByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = prisma_1.default.task.findUnique({
            where: {
                id: req.params.id,
            },
        });
        if (!task) {
            return res.status(200).json({
                ok: true,
                message: "Task not found",
                data: task,
            });
        }
        // Successful retrieval
        return res.status(200).json({
            ok: true,
            message: "User retrieved successfully",
            data: task,
        });
    }
    catch (err) {
        // Error handling
        return res.status(500).json({
            message: "Error retrieving task",
            error: err instanceof Error ? err.message : null,
        });
    }
});
exports.getTaskByID = getTaskByID;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.deleteTask = deleteTask;
