/* eslint-disable @typescript-eslint/no-unused-vars */
import { createPortal } from "react-dom";
import { useState } from "react";
import { motion } from "framer-motion";

// import { faEllipsis, faPlus } from "@fortawesome/free-solid-svg-icons";

// import DashboardAssignedUsers from "@/components/ui/Dashboard/AssignedUsers";
// import DashboardSearchTasks from "@/components/ui/Dashboard/SearchTasks";
// import DashboardNewTaskToggles from "@/components/ui/Dashboard/NewTaskToggles";

// import { listOfTasks } from "@/entities";
// import Button from "@/components/shared/ui/Button";
// import TaskCard from "@/components/ui/Cards/Task";
import NewProjectModal from "@/components/ui/Modals/NewProject";
import DashboardSelectedProject from "./SelectedProject";
// import NotFound from "@/components/containers/NotFound";

const Dashboard = () => {
  const [selectedProject, setSelectedProject] = useState<null | ProjectProps>(
    null
  );

  const [showNewProjectModal, setShowNewProjectModal] =
    useState<boolean>(false);
  const handleSelectedProject = () => {
    setSelectedProject(null);
  };

  return (
    <section className="flex flex-col w-full flex-1 items-center justify-center gap-8 p-10">
      <div className="flex flex-col gap-2 items-center justify-center">
        <h1 className="font-bold text-6xl flex items-center justify-center gap-2 flex-wrap max-md:text-center">
          Welcome to your
          <span className="text-[var(--color-primary)]">dashboard!</span>
        </h1>
        <p className="opacity-60 text-lg text-center">
          Get started by selecting a project or creating a new one.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => setShowNewProjectModal(!showNewProjectModal)}
          className="flex gap-2 items-center p-2 border-[--color-text-lightest] border-[1px] rounded-lg"
        >
          <p className="font-bold">Create a new project</p>
        </button>
        <button
          onClick={() => handleSelectedProject()}
          className="flex gap-2 items-center p-2 border-[--color-text-lightest] border-[1px] rounded-lg"
        >
          <p className="font-bold">Select an existing project</p>
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-2xl">Your projects</h1>
        <div className="flex gap-4">
          <button
            onClick={() => handleSelectedProject()}
            className="flex gap-2 items-center p-2 border-[--color-text-lightest] border-[1px] rounded-lg"
          >
            <p className="font-bold">Project 1</p>
          </button>
          <button
            onClick={() => handleSelectedProject()}
            className="flex gap-2 items-center p-2 border-[--color-text-lightest] border-[1px] rounded-lg"
          >
            <p className="font-bold">Project 2</p>
          </button>
          <button
            onClick={() => handleSelectedProject()}
            className="flex gap-2 items-center p-2 border-[--color-text-lightest] border-[1px] rounded-lg"
          >
            <p className="font-bold">Project 3</p>
          </button>
        </div>
      </div>

      {selectedProject && <DashboardSelectedProject />}

      {createPortal(
        showNewProjectModal && (
          <div className="absolute h-full w-full z-10 flex justify-center items-center p-10">
            <motion.div
              className="absolute h-full w-full z-0 bg-[--color-text-lightest]"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 0.8,
              }}
              exit={{
                opacity: 0,
              }}
            ></motion.div>
            <NewProjectModal
              showNewProjectModal={showNewProjectModal}
              setShowNewProjectModal={setShowNewProjectModal}
            />
          </div>
        ),
        document.getElementById("root") as HTMLElement
      )}
    </section>
  );
};

export default Dashboard;
