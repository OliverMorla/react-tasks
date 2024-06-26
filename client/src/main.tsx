import ReactDOM from "react-dom/client";
import { AnimatePresence } from "framer-motion";

// Components
import App from "./App";

// Providers
import TaskProvider from "@/providers/task-provider";
import ThemeProvider from "@/providers/theme-provider";
import AuthProvider from "@/providers/auth-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

// Styles
import "./global.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <AnimatePresence>
    <BrowserRouter>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <TaskProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </TaskProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </BrowserRouter>
  </AnimatePresence>
  // </React.StrictMode>
);
