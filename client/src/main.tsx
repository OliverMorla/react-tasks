import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "@/components/ui/Header";
import Sidebar from "@/components/ui/Sidebar";

import Board from "@/components/containers/Board";
import List from "@/components/containers/List";
import Calendar from "@/components/containers/Calendar";

import "./global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Sidebar />
      <main className="flex flex-col h-full w-full">
        <Header />
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/tab/list" element={<List />} />
          <Route path="/tab/calendar" element={<Calendar />} />
        </Routes>
      </main>
    </BrowserRouter>
  </React.StrictMode>
);
