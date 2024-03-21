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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const dotenv = __importStar(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const csurf_1 = __importDefault(require("csurf")); // For CSRF protection
// import helmet from "helmet";
// import compression from "compression";
// import multer from "multer"; // For file uploads
// import swaggerUi from "swagger-ui-express"; // For API documentation
// import YAML from "yamljs"; // To load the Swagger definition file
// Import middleware
const middleware_1 = require("./middleware");
// Import routes
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const project_routes_1 = __importDefault(require("./routes/project.routes"));
const projects_routes_1 = __importDefault(require("./routes/projects.routes"));
const comments_routes_1 = __importDefault(require("./routes/comments.routes"));
const connections_routes_1 = __importDefault(require("./routes/connections.routes"));
const connection_routes_1 = __importDefault(require("./routes/connection.routes"));
const tasks_routes_1 = __importDefault(require("./routes/tasks.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const task_routes_1 = __importDefault(require("./routes/task.routes"));
// Load environment variables from a .env file
dotenv.config();
// Create an Express application instance
const app = (0, express_1.default)();
// Define the port number to listen on
const port = process.env.PORT || 3000;
// Improve security by adding various HTTP headers
// app.use(helmet());
// Enable Cross-Origin Resource Sharing with options
app.use((0, cors_1.default)({
    // Specify allowed origins for better security, use '*' for development only
    origin: "*",
    methods: ["GET,POST,PUT,DELETE"],
}));
// Log HTTP requests to the console for debugging
app.use((0, morgan_1.default)("combined"));
// Apply rate limiting to all requests
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // Time window in milliseconds
//   max: 100, // Limit each IP to 100 requests per window
// });
// app.use(limiter);
// Parse incoming requests with JSON payloads
app.use((0, express_1.json)());
app.use((0, cookie_parser_1.default)());
// Parse requests with URL-encoded payloads
app.use((0, express_1.urlencoded)({ extended: true }));
// Serve static files like images, CSS files, and JavaScript files
app.use("/uploads", (0, express_1.static)("./src/uploads"));
app.use("/public", (0, express_1.static)("./src/public"));
app.use("/api", (0, express_1.static)("./src/public/api", { extensions: ["json"] })); // Serving API JSON files from 'public/api', with automatic .json extension resolution
// Placeholder for authentication middleware
// Implement JWT or session-based authentication here
// app.use((req, res, next) => {
// // Your authentication logic goes here
//   next();
// });
// Define routes for your application
// For example, user-related routes are managed by userRouter
app.use("/user", middleware_1.isAuthenticated, user_routes_1.default); // Single User
app.use("/users", middleware_1.isAuthenticated, users_routes_1.default); // Multiple User
app.use("/project", middleware_1.isAuthenticated, project_routes_1.default); // Single Project
app.use("/projects", middleware_1.isAuthenticated, projects_routes_1.default); // Multiple Projects
app.use("/comment", middleware_1.isAuthenticated, comments_routes_1.default); // Single Comment
app.use("/comments", middleware_1.isAuthenticated, comments_routes_1.default); // Multiple Comments
app.use("/connection", middleware_1.isAuthenticated, connection_routes_1.default); // Single Connection
app.use("/connections", middleware_1.isAuthenticated, connections_routes_1.default); // Multiple Connections
app.use("/task", middleware_1.isAuthenticated, task_routes_1.default); // Single Task
app.use("/tasks", middleware_1.isAuthenticated, tasks_routes_1.default); // Multiple Tasks
app.use("/auth", auth_routes_1.default); // Authentication
// Define a default route that returns a welcome message
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "templates", "server", "index.html"));
});
// // Handle 404 errors: when no other route matches the HTTP request
app.use((req, res, next) => {
    res.status(404).json({ message: "Endpoint not found" });
});
// File upload configuration
// const upload = multer({ dest: "uploads/" });
// Session management
app.use((0, express_session_1.default)({
    secret: (_a = process.env.SESSION_SECRET) !== null && _a !== void 0 ? _a : "",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, httpOnly: true },
}));
// CSRF protection
app.use((0, csurf_1.default)());
// Use `upload.single('file')` or `upload.array('files', 5)` in specific routes
// Central error handling: catch any errors that occur during handling requests
// app.use((err, req, res, next) => {
//   console.error(err.stack); // Log error stack for debugging
//   res.status(err.statusCode || 500).json({ message: err.message || "Internal Server Error" });
// });
// Checks the routes in the app
const routesChecker = () => {
    const routes = [];
    app._router.stack.forEach((middleware) => {
        if (middleware.route) {
            routes.push(middleware.route);
        }
        else if (middleware.name === "router") {
            middleware.handle.stack.forEach((handler) => {
                routes.push(handler.route);
            });
        }
    });
};
// Start the server and listen on the port specified in the .env file or port 3000
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
exports.default = app;
