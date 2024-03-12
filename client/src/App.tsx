import { Fragment } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

// Components (UI)
import Header from "@/components/ui/Header";
import Sidebar from "@/components/ui/Sidebar";

// Containers (Pages)
import NotFound from "@/components/containers/NotFound";
import List from "@/components/containers/List";
import Calendar from "@/components/containers/Calendar";
import Upgrade from "@/components/containers/Upgrade";
import Dashboard from "@/components/containers/Dashboard";
import Tasks from "@/components/containers/Tasks";
import Projects from "@/components/containers/Projects";
import Messages from "@/components/containers/Messages";
import Users from "@/components/containers/Users";
import Auth from "./components/containers/Auth";

// Hooks
import useAuth from "@/hooks/useAuth";

const App = () => {
  const { pathname } = useLocation();

  const { isAuthenticated } = useAuth() ?? {
    isAuthenticated: false,
  };

  if (isAuthenticated && pathname.includes("/auth")) {
    return <Navigate to="/dashboard" />;
  }

  if (!isAuthenticated && !pathname.includes("/auth")) {
    return <Navigate to="/auth" />;
  }

  return (
    <Fragment>
      {!isAuthenticated && (
        <Fragment>
          <Routes>
            <Route
              path="/auth"
              element={<Auth />}
              errorElement={<NotFound />}
            />
          </Routes>
        </Fragment>
      )}

      {isAuthenticated && (
        <Fragment>
          <Sidebar />
          <main className="flex flex-col flex-grow w-full">
            <Header />
            <Routes>
              <Route path="/" element={<Dashboard key={1} />} />
              <Route path="/list" element={<List />} />
              <Route path="/calendar" element={<Calendar />} />

              <Route path="/messages" element={<Messages />} />
              <Route path="/users" element={<Users />} />
              <Route path="/dashboard" element={<Dashboard key={2} />} />
              <Route path="/upgrade" element={<Upgrade />} />
              <Route path="/tasks" element={<Tasks />} />

              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/personal" element={<Projects />} />
              <Route path="/projects/shared" element={<Projects />} />
              <Route path="/projects/archived" element={<Projects />} />
              <Route path="/projects/:projectId" element={<Projects />} />
            </Routes>
          </main>
        </Fragment>
      )}
    </Fragment>
  );
};

export default App;
