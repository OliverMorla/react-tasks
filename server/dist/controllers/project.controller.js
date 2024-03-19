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
exports.deleteProject = exports.updateProject = exports.createProject = exports.getProjectsByEmbeddedQuery = exports.getProjectsByQuery = exports.getProjectByID = exports.getProjects = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield prisma_1.default.project.findMany();
        if (projects) {
            return res.status(200).json({
                ok: true,
                message: "Projects retrieved successfully",
                data: projects,
            });
        }
    }
    catch (err) {
        return res.status(500).json({
            error: err instanceof Error ? err.message : null,
            message: "Error retrieving projects",
        });
    }
});
exports.getProjects = getProjects;
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
const getProjectsByEmbeddedQuery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    let whereFilter = {};
    for (const [key, value] of Object.entries(query)) {
        whereFilter[key] = value;
    }
    try {
        const projects = yield prisma_1.default.project.findMany({
            where: Object.keys(query).length === 0
                ? {
                    id: null,
                }
                : whereFilter,
            include: {
                tasks: true,
                connections: {
                    include: {
                        User: true,
                    },
                },
            },
        });
        if (projects.length === 0) {
            return res.status(404).json({
                ok: false,
                message: "Project not found",
            });
        }
        return res.status(200).json({
            ok: true,
            message: "Project found",
            data: projects,
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Error retrieving project",
            error: err instanceof Error ? err.message : null,
        });
    }
});
exports.getProjectsByEmbeddedQuery = getProjectsByEmbeddedQuery;
const getProjectsByQuery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    let whereFilter = {};
    for (const [key, value] of Object.entries(query)) {
        whereFilter[key] = value;
    }
    try {
        const projects = yield prisma_1.default.project.findMany({
            where: Object.keys(query).length === 0
                ? {
                    id: null,
                }
                : whereFilter,
            include: {
                tasks: true,
                connections: {
                    include: {
                        User: true,
                    },
                },
            },
        });
        if (projects.length === 0) {
            return res.status(404).json({
                ok: false,
                message: "Project not found",
            });
        }
        return res.status(200).json({
            ok: true,
            message: "Project found",
            data: projects,
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Error retrieving project",
            error: err instanceof Error ? err.message : null,
        });
    }
});
exports.getProjectsByQuery = getProjectsByQuery;
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.createProject = createProject;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.updateProject = updateProject;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.deleteProject = deleteProject;
