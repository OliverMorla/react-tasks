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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jwt = __importStar(require("jsonwebtoken"));
// const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
//   if (true) {
//     next();
//   }
// };
const isAuthenticated = (req, res, next) => {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.session;
    if (!token) {
        return res
            .status(401)
            .json({ message: "Access denied. No token provided." });
    }
    if (!process.env.JWT_SECRET) {
        console.error("=> JWT_SECRET environment variable is not set.");
        return res.status(500).json({ message: "Internal server error." });
    }
    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // @ts-ignore
        req.user = decoded; // Optionally add the decoded user info to the request
        next(); // Proceed to the next middleware/route handler
    }
    catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            return res
                .status(401)
                .json({ message: "Session expired. Please login again." });
        }
        else if (err instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Invalid token." });
        }
        else {
            return res.status(500).json({ message: "Could not verify token." });
        }
    }
};
exports.isAuthenticated = isAuthenticated;
