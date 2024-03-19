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
const prisma_1 = __importDefault(require("../lib/prisma"));
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield prisma_1.default.comment.findMany();
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
            message: "Error retrieving comment",
            error: err instanceof Error ? err.message : null,
        });
    }
});
exports.getComments = getComments;
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
