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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserByID = exports.getUsers = void 0;
const entities_1 = require("../entities");
const prisma_1 = __importDefault(require("../lib/prisma"));
/**
 * Handles the retrieval of users with optional filtering, embedding, and pagination.
 * Allows filtering by any model attribute not explicitly reserved in queryOptions.
 * Supports embedding related models for richer data retrieval.
 *
 * @param req Express request object, containing query parameters for filtering and options.
 * @param res Express response object for sending back the users or error messages.
 */
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, embed, include } = req.query;
    let whereFilter = {};
    // Build the filter object from query parameters, excluding reserved options.
    Object.entries(req.query).forEach(([key, value]) => {
        if (!entities_1.queryOptions.includes(key)) {
            whereFilter[key] = value;
        }
    });
    try {
        // Check if the include query parameter is set to "all" or a specific model.
        if (include) {
            const users = yield prisma_1.default.user
                .findMany({
                where: Object.keys(whereFilter).length > 0 ? whereFilter : {},
                include: {
                    projects: (embed === "projects" && !include) || include === "all",
                    comments: (embed === "comments" && !include) || include === "all",
                    connections: (embed === "connections" && !include) || include === "all",
                    tasks: (embed === "tasks" && !include) || include === "all",
                },
                skip: page ? parseInt(page) * 10 : 0, // Pagination offset calculation.
                take: limit ? parseInt(limit) : 10, // Number of items to retrieve.
            })
                .then((users) => users.map((user) => {
                const { password } = user, userWithoutPassword = __rest(user, ["password"]);
                return userWithoutPassword;
            }));
            // Successful retrieval
            if (users) {
                return res.status(200).json({
                    ok: true,
                    message: "Users retrieved successfully",
                    data: users,
                });
            }
        }
        const users = yield prisma_1.default.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                photoUrl: true,
                role: true,
            },
            where: Object.keys(whereFilter).length > 0 ? whereFilter : {},
            skip: page ? parseInt(page) * 10 : 0, // Pagination offset calculation.
            take: limit ? parseInt(limit) : 10, // Number of items to retrieve.
        });
        // Successful retrieval
        if (users) {
            return res.status(200).json({
                ok: true,
                message: "Users retrieved successfully",
                data: users,
            });
        }
    }
    catch (err) {
        return res.status(500).json({
            message: "Error retrieving users",
            error: err instanceof Error ? err.message : null,
        });
    }
});
exports.getUsers = getUsers;
/**
 * Fetches a single user by their ID.
 *
 * @param req Express request object, containing the ID parameter.
 * @param res Express response object for sending back the found connection or an error message.
 *
 */
const getUserByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_1.default.user.findUnique({
            where: {
                id: req.params.id,
            },
        });
        if (!user) {
            return res.status(200).json({
                ok: true,
                message: "User not found",
                data: user,
            });
        }
        return res.status(200).json({
            ok: true,
            message: "User retrieved successfully",
            data: user,
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Error retrieving user",
            error: err instanceof Error ? err.message : null,
        });
    }
});
exports.getUserByID = getUserByID;
/**
 * Updates a user with the provided data.
 *
 * @param req Express request object, containing the user data.
 * @param res Express response object for sending back the success message or error messages.
 */
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, photoUrl } = req.body;
    return res.status(201).json({
        ok: true,
        message: "User created successfully",
        data: {
            name,
            email,
            password,
            photoUrl,
        },
    });
});
exports.updateUser = updateUser;
/**
 * Deletes a user by their ID.
 *
 * @param req Express request object, containing the ID parameter.
 * @param res Express response object for sending back the success message or error messages.
 */
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doesUserExist = yield prisma_1.default.user.findUnique({
            where: {
                //@ts-ignore
                id: req.user.id,
            },
        });
        if (!doesUserExist) {
            return res.status(404).json({
                ok: false,
                message: "User not found",
            });
        }
        const user = yield prisma_1.default.user.delete({
            where: {
                //@ts-ignore
                id: req.user.id,
            },
        });
        if (user) {
            return res.status(201).json({
                ok: true,
                message: "User deleted successfully",
            });
        }
    }
    catch (err) {
        return res.status(500).json({
            message: "Error retrieving user",
            error: err instanceof Error ? err.message : null,
        });
    }
});
exports.deleteUser = deleteUser;
