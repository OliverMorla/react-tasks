import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Providers
import TaskProvider from "@/providers/task-provider";
import ThemeProvider from "@/providers/theme-provider";
import AuthProvider from "@/providers/auth-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Styles
import "./global.css";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <TaskProvider>
              <App />
            </TaskProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
