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
exports.logOutUser = exports.loginUser = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserByID = exports.getUsers = void 0;
const express_validator_1 = require("express-validator");
const entities_1 = require("../entities");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
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
                    projects: (embed === "project" && !include) || include === "all",
                    comments: (embed === "comment" && !include) || include === "all",
                    connections: (embed === "connection" && !include) || include === "all",
                    tasks: (embed === "task" && !include) || include === "all",
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
 * Creates a new user with the provided data.
 *
 * @param req Express request object, containing the user data.
 * @param res Express response object for sending back the success message or error messages.
 */
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            message: "Validation error",
            errors: errors.array(),
        });
    }
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            ok: false,
            message: "All fields are required",
        });
    }
    try {
        if (!process.env.HASH_ROUNDS) {
            console.error("=> HASH_ROUNDS does not exist");
            return;
        }
        bcryptjs_1.default.genSalt(parseInt(process.env.HASH_ROUNDS), (err, salt) => __awaiter(void 0, void 0, void 0, function* () {
            bcryptjs_1.default.hash(password, salt, (err, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: "Error hashing password",
                        error: err instanceof Error ? err.message : null,
                    });
                }
                const user = yield prisma_1.default.user.create({
                    data: {
                        name,
                        email,
                        password: hashedPassword,
                    },
                });
                if (!user) {
                    return res.status(500).json({
                        ok: false,
                        message: "Error creating user",
                    });
                }
                return res.status(201).json({
                    ok: true,
                    message: "User created successfully",
                });
            }));
        }));
    }
    catch (err) {
        return res.status(500).json({
            message: "Error creating user",
            error: err instanceof Error ? err.message : null,
        });
    }
});
exports.createUser = createUser;
/**
 * Logs in a user with the provided email and password.
 *
 * @param req Express request object, containing the user data.
 * @param res Express Response object, for sending back the success message or error messages.
 */
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            message: "Validation error",
            errors: errors.array(),
        });
    }
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({
            ok: false,
            message: "All fields are required",
        });
    }
    try {
        if (!process.env.HASH_ROUNDS) {
            console.error("=> HASH_ROUNDS does not exist");
            return;
        }
        const user = yield prisma_1.default.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            return res.status(404).json({
                ok: false,
                message: "User not found",
            });
        }
        bcryptjs_1.default.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: "Error comparing passwords",
                    error: err instanceof Error ? err.message : null,
                });
            }
            if (!result) {
                return res.status(401).json({
                    ok: false,
                    message: "Wrong password",
                });
            }
            return res.status(200).json({
                ok: true,
                message: "User logged in successfully",
            });
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Error logging in",
            error: err instanceof Error ? err.message : null,
        });
    }
});
exports.loginUser = loginUser;
/**
 * Logs out a user by invalidating their session.
 *
 * @param req Express request object, containing the user data.
 * @param res Express response object for sending back the success message or error messages.
 */
const logOutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.logOutUser = logOutUser;
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
                id: req.params.id,
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
                id: req.params.id,
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
