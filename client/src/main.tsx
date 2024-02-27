import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import Header from "@/components/ui/Header";
import Sidebar from "@/components/ui/Sidebar";

import "./global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Sidebar />
    <div className="flex flex-col h-full w-full">
      <Header />
      <App />
    </div>
  </React.StrictMode>
);
