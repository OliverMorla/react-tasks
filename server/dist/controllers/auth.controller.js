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
exports.session = exports.signOut = exports.signIn = exports.signUp = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = __importDefault(require("../lib/prisma"));
/**
 * Creates a new user with the provided data.
 *
 * @param req Express request object, containing the user data.
 * @param res Express response object for sending back the success message or error messages.
 *
 * @returns A promise that reveals whether the user was created successfully or not.
 */
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.signUp = signUp;
/**
 * Logs in a user with the provided email and password.
 *
 * @param req Express request object, containing the user data.
 * @param res Express Response object, for sending back the success message or error messages.
 *
 * @returns A promise that reveals whether the user was logged in successfully or not.
 */
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            return console.error("=> HASH_ROUNDS does not exist");
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
            if (!process.env.JWT_SECRET) {
                return console.error("=> Failed to read .env in signIn");
            }
            const jwtSecret = process.env.JWT_SECRET;
            if (!result) {
                return res.status(401).json({
                    ok: false,
                    message: "Wrong password",
                });
            }
            const token = jwt.sign(user, jwtSecret, {
                expiresIn: "24h",
            });
            if (!token) {
                return res.status(500).json({
                    ok: false,
                    message: "Error creating token",
                });
            }
            // Send the token in a cookie
            res.cookie("session", token, {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production" ? true : false,
                path: "/",
                maxAge: 24 * 60 * 60 * 1000,
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            });
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
exports.signIn = signIn;
/**
 * Logs out a user by invalidating their session.
 *
 * @param req Express request object, containing the user data.
 * @param res Express response object for sending back the success message or error messages.
 *
 * @returns A promise that reveals whether the user was logged out successfully or not.
 */
const signOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("session");
    return res.status(200).json({
        ok: true,
        message: "User logged out successfully",
    });
});
exports.signOut = signOut;
/**
 *
 * @param req Express request object, that contains the session token
 * @param res Express response object for sending back the success message or error messages
 *
 * @returns A promise that reveals whether the session was found or not
 */
const session = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!process.env.JWT_SECRET) {
        console.error("=> Failed to read .env in session");
        return res.status(500).json({
            message: "Internal server error",
        });
    }
    const jwtSecret = process.env.JWT_SECRET;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.session;
    if (!token) {
        return res.status(401).json({
            message: "No session found",
        });
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        // If verification is successful and the token hasn't expired, continue
        return res.status(200).json({
            ok: true,
            message: "Session found",
            data: decoded,
        });
    }
    catch (err) {
        // Check if the error is because the token has expired
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: "Session expired" });
        }
        else if (err instanceof jwt.JsonWebTokenError) {
            // The error is because the token is invalid
            return res.status(401).json({ message: "Invalid token" });
        }
        else {
            // Handle other possible errors (e.g., jwt.NotBeforeError or any other error)
            return res.status(500).json({ message: "Could not verify token" });
        }
    }
});
exports.session = session;
