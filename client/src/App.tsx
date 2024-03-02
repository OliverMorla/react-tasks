import { BrowserRouter, Route, Routes } from "react-router-dom";

// Components (UI)
import Header from "@/components/ui/Header";
import Sidebar from "@/components/ui/Sidebar";

// Containers (Pages)
import Board from "@/components/containers/Board";
import List from "@/components/containers/List";
import Calendar from "@/components/containers/Calendar";
import Upgrade from "@/components/containers/Upgrade";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Sidebar />
        <main className="flex flex-col h-full w-full">
          <Header />
          <Routes>
            <Route path="/" element={<Board />} />
            <Route path="/tab/list" element={<List />} />
            <Route path="/tab/calendar" element={<Calendar />} />
            <Route path="/upgrade" element={<Upgrade />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
};

export default App;
