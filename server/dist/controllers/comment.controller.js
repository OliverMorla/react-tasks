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
exports.getCommentByID = exports.getComments = void 0;
const entities_1 = require("../entities");
const prisma_1 = __importDefault(require("../lib/prisma"));
/**
 * Handles the retrieval of comments with optional filtering and pagination.
 * Allows filtering by any model attribute not explicitly reserved in queryOptions.
 *
 * @param req Express request object, containing query parameters for filtering and options.
 * @param res Express response object for sending back the comments or error messages.
 */
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const comments = yield prisma_1.default.comment.findMany({
            where: Object.keys(whereFilter).length > 0 ? whereFilter : {},
            include: {
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
                task: (embed === "task" && !include) || include === "all",
            },
            skip: page ? parseInt(page) * 10 : 0, // Pagination offset calculation.
            take: limit ? parseInt(limit) : 10, // Number of items to retrieve.
        });
        // Successful retrieval
        if (comments) {
            return res.status(200).json({
                ok: true,
                message: "Comments retrieved successfully",
                data: comments,
            });
        }
    }
    catch (err) {
        return res.status(500).json({
            message: "Error retrieving comments",
            error: err instanceof Error ? err.message : null,
        });
    }
});
exports.getComments = getComments;
/**
 * Retrieves a comment by its unique identifier.
 *
 * @param req Express request object, containing the comment ID.
 * @param res Express response object for sending back the comment or error messages.
 */
const getCommentByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = yield prisma_1.default.comment.findUnique({
            where: {
                id: req.params.id,
            },
        });
        if (!comment) {
            return res.status(404).json({
                ok: false,
                message: "Comment not found",
                data: comment,
            });
        }
        // Successful retrieval
        return res.status(200).json({
            ok: true,
            message: "Comment found",
            data: comment,
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Error retrieving comment",
            error: err instanceof Error ? err.message : null,
        });
    }
});
exports.getCommentByID = getCommentByID;
