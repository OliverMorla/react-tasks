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
exports.getConnectionByID = exports.getConnections = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const getConnections = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connections = yield prisma_1.default.connection.findMany({});
        if (connections) {
            return res.status(200).json({
                ok: true,
                message: "Connections retrieved successfully",
                data: connections,
            });
        }
    }
    catch (err) {
        return res.status(500).json({
            message: "Error retrieving connections",
            error: err instanceof Error ? err.message : null,
        });
    }
});
exports.getConnections = getConnections;
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
                data: connection,
            });
        }
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
