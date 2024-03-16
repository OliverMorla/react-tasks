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
const prisma_1 = __importDefault(require("../lib/prisma"));
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield prisma_1.default.task.findMany();
        if (tasks) {
            res.status(200).json({
                ok: true,
                message: "Tasks retrieved successfully",
                data: tasks,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            message: "Error retrieving tasks",
            error: err instanceof Error ? err.message : null,
        });
    }
});
exports.getTasks = getTasks;
const getTaskByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = prisma_1.default.task.findUnique({
            where: {
                id: req.params.id,
            },
        });
        if (!task) {
            res.status(200).json({
                ok: true,
                message: "Task not found",
                data: task,
            });
        }
        res.status(200).json({
            ok: true,
            message: "User retrieved successfully",
            data: task,
        });
    }
    catch (err) {
        res.status(500).json({
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