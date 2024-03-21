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
exports.deleteConnection = exports.createConnection = exports.getConnectionByID = exports.getConnections = void 0;
const entities_1 = require("../entities");
const prisma_1 = __importDefault(require("../lib/prisma"));
/**
 * Handles the retrieval of connections with optional filtering, embedding, and pagination.
 * Allows filtering by any model attribute not explicitly reserved in queryOptions.
 * Supports embedding related models for richer data retrieval.
 *
 * @param req Express request object, containing query parameters for filtering and options.
 * @param res Express response object for sending back the connections or error messages.
 */
const getConnections = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, embed, include } = req.query;
    let whereFilter = {};
    // Build the filter object from query parameters, excluding reserved options.
    Object.entries(req.query).forEach(([key, value]) => {
        if (!entities_1.queryOptions.includes(key)) {
            whereFilter[key] = value;
        }
    });
    try {
        const connections = yield prisma_1.default.connection.findMany({
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
            },
            skip: page ? parseInt(page) * 10 : 0, // Pagination offset calculation.
            take: limit ? parseInt(limit) : 10, // Number of items to retrieve.
        });
        if (connections) {
            // Successful retrieval
            return res.status(200).json({
                ok: true,
                message: "Connections retrieved successfully",
                data: connections,
            });
        }
    }
    catch (err) {
        // Error handling
        return res.status(500).json({
            message: "Error retrieving connections",
            error: err instanceof Error ? err.message : null,
        });
    }
});
exports.getConnections = getConnections;
/**
 * Fetches a single connection by its ID.
 *
 * @param req Express request object, containing the ID parameter.
 * @param res Express response object for sending back the found connection or an error message.
 */
const getConnectionByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield prisma_1.default.connection.findUnique({
            where: {
                id: req.params.id,
            },
        });
        if (!connection) {
            return res.status(404).json({
                ok: false,
                message: "Connection not found",
            });
        }
        // Successful retrieval
        return res.status(200).json({
            ok: true,
            message: "Connection found",
            data: connection,
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Error retrieving connection",
            error: err instanceof Error ? err.message : null,
        });
    }
});
exports.getConnectionByID = getConnectionByID;
// Placeholder for future implementation.
const createConnection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Implement logic to create a connection
});
exports.createConnection = createConnection;
// Placeholder for future implementation.
const deleteConnection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Implement logic to delete a connection
});
exports.deleteConnection = deleteConnection;
