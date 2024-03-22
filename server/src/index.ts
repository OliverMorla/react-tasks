import express, { json, urlencoded, static as expressStatic } from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
// import rateLimit from "express-rate-limit";
// import session from "express-session";
import csurf from "csurf"; // For CSRF protection
// import helmet from "helmet";
// import compression from "compression";
// import multer from "multer"; // For file uploads
// import swaggerUi from "swagger-ui-express"; // For API documentation
// import YAML from "yamljs"; // To load the Swagger definition file

// Import middleware
import { isAuthenticated } from "./middleware";

// Import routes
import userRouter from "./routes/user.routes";
import usersRouter from "./routes/users.routes";
import projectRouter from "./routes/project.routes";
import projectsRouter from "./routes/projects.routes";
import commentsRouter from "./routes/comments.routes";
import connectionsRouter from "./routes/connections.routes";
import connectionRouter from "./routes/connection.routes";
import tasksRouter from "./routes/tasks.routes";
import authRouter from "./routes/auth.routes";
import taskRouter from "./routes/task.routes";

// Load environment variables from a .env file
dotenv.config();

// Create an Express application instance
const app = express();

// Define the port number to listen on
const port = process.env.PORT || 3000;

// Improve security by adding various HTTP headers
// app.use(helmet());

if (!process.env.CORS_ORIGIN) {
  console.error("=> CORS_ORIGIN is not defined in .env file");
}

// Enable Cross-Origin Resource Sharing with options
app.use(
  cors({
    // Specify allowed origins for better security, use '*' for development only
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET,POST,PUT,DELETE"],
  })
);

// Log HTTP requests to the console for debugging
app.use(morgan("combined"));

// Apply rate limiting to all requests
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // Time window in milliseconds
//   max: 100, // Limit each IP to 100 requests per window
// });
// app.use(limiter);

// Parse incoming requests with JSON payloads
app.use(json());

// Parse Cookie header and populate req.cookies with an object keyed by the cookie names. 
app.use(cookieParser());

// Parse requests with URL-encoded payloads
app.use(urlencoded({ extended: true }));

// Serve static files like images, CSS files, and JavaScript files
app.use("/uploads", expressStatic("./src/uploads"));
app.use("/public", expressStatic("./src/public"));
app.use("/api", expressStatic("./src/public/api", { extensions: ["json"] })); // Serving API JSON files from 'public/api', with automatic .json extension resolution

// Placeholder for authentication middleware
// Implement JWT or session-based authentication here
// app.use((req, res, next) => {
// // Your authentication logic goes here
//   next();
// });

// Define routes for your application
// For example, user-related routes are managed by userRouter
app.use("/user", isAuthenticated, userRouter); // Single User
app.use("/users", usersRouter); // Multiple User
app.use("/project", isAuthenticated, projectRouter); // Single Project
app.use("/projects", projectsRouter); // Multiple Projects
app.use("/comment", isAuthenticated, commentsRouter); // Single Comment
app.use("/comments", commentsRouter); // Multiple Comments
app.use("/connection", isAuthenticated, connectionRouter); // Single Connection
app.use("/connections", connectionsRouter); // Multiple Connections
app.use("/task", isAuthenticated, taskRouter); // Single Task
app.use("/tasks", tasksRouter); // Multiple Tasks
app.use("/auth", authRouter); // Authentication

// Define a default route that returns a welcome message
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "server", "index.html"));
});

// // Handle 404 errors: when no other route matches the HTTP request
app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// File upload configuration
// const upload = multer({ dest: "uploads/" });

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET ?? "",
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       httpOnly: true,
//       sameSite: "strict",
//       secure: process.env.NODE_ENV === "production" ? true : false,
//       path: "/",
//       maxAge: 24 * 60 * 60 * 1000,
//       expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
//     },
//   })
// );

// CSRF protection
app.use(csurf());

// Use `upload.single('file')` or `upload.array('files', 5)` in specific routes

// Central error handling: catch any errors that occur during handling requests
// app.use((err, req, res, next) => {
//   console.error(err.stack); // Log error stack for debugging
//   res.status(err.statusCode || 500).json({ message: err.message || "Internal Server Error" });
// });

// Checks the routes in the app
// const routesChecker = () => {
//   const routes = [];

//   app._router.stack.forEach((middleware: any) => {
//     if (middleware.route) {
//       routes.push(middleware.route);
//     } else if (middleware.name === "router") {
//       middleware.handle.stack.forEach((handler: any) => {
//         routes.push(handler.route);
//       });
//     }
//   });
// };

// Start the server and listen on the port specified in the .env file or port 3000
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

export default app;
