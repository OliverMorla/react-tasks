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
exports.deleteProject = exports.updateProject = exports.createProject = exports.getProjectByID = exports.getProjects = void 0;
const entities_1 = require("../entities");
const prisma_1 = __importDefault(require("../lib/prisma"));
/**
 * Handles the retrieval of projects with optional filtering, embedding, and pagination.
 * Allows filtering by any model attribute not explicitly reserved in queryOptions.
 * Supports embedding related models for richer data retrieval.
 *
 * @param req Express request object, containing query parameters for filtering and options.
 * @param res Express response object for sending back the projects or error messages.
 */
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, embed, include } = req.query;
    let whereFilter = {};
    // Build the filter object from query parameters, excluding reserved options.
    Object.entries(req.query).forEach(([key, value]) => {
        if (!entities_1.queryOptions.includes(key)) {
            whereFilter[key] = value;
        }
    });
    try {
        const projects = yield prisma_1.default.project.findMany({
            where: Object.keys(whereFilter).length > 0 ? whereFilter : {},
            include: {
                tasks: (embed === "tasks" && !include) || include === "all",
                connections: (embed === "connections" && !include) || include === "all"
                    ? {
                        include: {
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
            },
        });
        // Successful retrieval
        if (projects) {
            return res.status(200).json({
                ok: true,
                message: "Projects retrieved successfully",
                data: projects,
            });
        }
    }
    catch (err) {
        // Error handling
        return res.status(500).json({
            error: err instanceof Error ? err.message : null,
            message: "Error retrieving projects",
        });
    }
});
exports.getProjects = getProjects;
/**
 * Handles the retrieval of a project by its unique identifier.
 *
 * @param req Express request object, containing the project ID.
 * @param res Express response object for sending back the project or error messages.
 */
const getProjectByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield prisma_1.default.project.findUnique({
            where: {
                id: req.params.id,
            },
        });
        if (!project) {
            return res.status(404).json({
                ok: false,
                message: "Project not found",
                data: project,
            });
        }
        return res.status(200).json({
            ok: true,
            message: "Project found",
            data: project,
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Error retrieving project",
            error: err instanceof Error ? err.message : null,
        });
    }
});
exports.getProjectByID = getProjectByID;
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.createProject = createProject;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.updateProject = updateProject;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.deleteProject = deleteProject;
