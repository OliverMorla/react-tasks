"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes = [
    { path: "/", exact: true, component: "Dashboard" },
    { path: "/auth", component: "Auth" },
    { path: "/list", component: "List" },
    { path: "/calendar", component: "Calendar" },
    { path: "/messages", component: "Messages" },
    { path: "/users", component: "Users" },
    { path: "/dashboard", component: "Dashboard" },
    { path: "/upgrade", component: "Upgrade" },
    { path: "/tasks", component: "Tasks" },
    { path: "/projects", component: "Projects" },
    { path: "/projects/personal", component: "Projects" },
    { path: "/projects/shared", component: "Projects" },
    { path: "/projects/archived", component: "Projects" },
    { path: "/projects/:projectId", component: "Projects" },
    // Add any other routes that you have components for but haven't listed above
];
exports.default = routes;
