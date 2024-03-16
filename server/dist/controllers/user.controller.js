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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserByID = exports.getUsers = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
// /api/users - GET - Get all users
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma_1.default.user.findMany();
        if (users) {
            res.status(200).json({
                ok: true,
                message: "Users retrieved successfully",
                data: users,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            message: "Error retrieving users",
            error: err instanceof Error ? err.message : null,
        });
    }
});
exports.getUsers = getUsers;
// /api/users/:id - GET - Get user by ID
const getUserByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_1.default.user.findUnique({
            where: {
                id: req.params.id,
            },
        });
        if (!user) {
            res.status(200).json({
                ok: true,
                message: "User not found",
                data: user,
            });
        }
        res.status(200).json({
            ok: true,
            message: "User retrieved successfully",
            data: user,
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Error retrieving user",
            error: err instanceof Error ? err.message : null,
        });
    }
});
exports.getUserByID = getUserByID;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.deleteUser = deleteUser;
