import express, { json, urlencoded, static as expressStatic } from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";
// import compression from "compression";
import cors from "cors";
import path from "path";
// import helmet from "helmet";
import rateLimit from "express-rate-limit";
import session from "express-session";
// import multer from "multer"; // For file uploads
// import { body } from "express-validator"; // For data validation
// import swaggerUi from "swagger-ui-express"; // For API documentation
// import YAML from "yamljs"; // To load the Swagger definition file
import csurf from "csurf"; // For CSRF protection

// Import routes
import userRouter from "./routes/user.routes";
import usersRouter from "./routes/users.routes";
import projectRouter from "./routes/project.routes";
import projectsRouter from "./routes/projects.routes";
import commentsRouter from "./routes/comments.routes";
import { isAuthenticated } from "./middleware";
import connectionsRouter from "./routes/connections.routes";

// Load environment variables from a .env file
dotenv.config();

// Create an Express application instance
const app = express();

// Define the port number to listen on
const port = process.env.PORT || 3000;

// Improve security by adding various HTTP headers
// app.use(helmet());

// Enable Cross-Origin Resource Sharing with options
app.use(
  cors({
    // Specify allowed origins for better security, use '*' for development only
    origin: "*",
    methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
  })
);

// Log HTTP requests to the console for debugging
app.use(morgan("combined"));

// Apply rate limiting to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Time window in milliseconds
  max: 100, // Limit each IP to 100 requests per window
});
app.use(limiter);

// Parse incoming requests with JSON payloads
app.use(json());

// Parse requests with URL-encoded payloads
app.use(urlencoded({ extended: true }));

// Serve static files like images, CSS files, and JavaScript files
app.use("/uploads", expressStatic("uploads"));
app.use("/public", expressStatic("./src/public"));
// Serving API JSON files from 'public/api', with automatic .json extension resolution
app.use("/api", expressStatic("public/api", { extensions: ["json"] }));

// Placeholder for authentication middleware
// Implement JWT or session-based authentication here
// app.use((req, res, next) => {
// // Your authentication logic goes here
//   next();
// });

// Define routes for your application
// For example, user-related routes are managed by userRouter
app.use("/users", isAuthenticated, usersRouter); // Multiple User
app.use("/user", isAuthenticated, userRouter); // Single User
app.use("/projects", isAuthenticated, projectsRouter); // Multiple Projects
app.use("/project", isAuthenticated, projectRouter); // Single Project
app.use("/comments", isAuthenticated, commentsRouter);
app.use("/connections", isAuthenticated, connectionsRouter);

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

// Session management
app.use(
  session({
    secret: process.env.SESSION_SECRET ?? "",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, httpOnly: true },
  })
);

// CSRF protection
app.use(csurf());

// Use `upload.single('file')` or `upload.array('files', 5)` in specific routes

// Central error handling: catch any errors that occur during handling requests
// app.use((err, req, res, next) => {
//   console.error(err.stack); // Log error stack for debugging
//   res.status(err.statusCode || 500).json({ message: err.message || "Internal Server Error" });
// });

const getAllRoutes = () => {
  const routes = [];

  app._router.stack.forEach((middleware: any) => {
    if (middleware.route) {
      console.log(middleware.route);
    } else if (middleware.name === "router") {
      middleware.handle.stack.forEach((handler: any) => {
        console.log(handler.route);
      });
    }
  });
};

// getAllRoutes();

// Start the server and listen on the port specified in the .env file or port 3000
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

export default app;
