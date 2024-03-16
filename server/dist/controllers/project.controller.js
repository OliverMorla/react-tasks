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
const prisma_1 = __importDefault(require("../lib/prisma"));
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield prisma_1.default.project.findMany();
        if (projects) {
            res.status(200).json({
                ok: true,
                message: "Projects retrieved successfully",
                data: projects,
            });
        }
    }
    catch (err) {
        res.status(500).json({
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
            res.status(200).json({
                ok: false,
                message: "Project not found",
                data: project,
            });
        }
        res.status(200).json({
            ok: true,
            message: "Project retrieved successfully",
            data: project,
        });
    }
    catch (err) {
        res.status(500).json({
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
