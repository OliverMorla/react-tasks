/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";

// UI Components
import NewProjectModal from "@/components/ui/Modals/NewProject";
import DashboardSelectedProject from "@/components/ui/Dashboard/SelectedProject";
import { listOfProjects } from "@/entities";
import ProjectCard from "@/components/ui/Cards/Project";
import Modal from "@/components/shared/ui/Modal";
import { useSelector } from "react-redux";
import { setProjects } from "@/redux/slices/project-slice";

const Dashboard = () => {
  const dispatch = useDispatch();
  dispatch(setProjects(listOfProjects));
  const [selectedProject, setSelectedProject] = useState<null | ProjectProps>(
    null
  );


  
  const projects = useSelector((state: any) => state.projectReducer.projects)
  


  const [showModal, setShowModal] = useState<boolean>(false);

  const [showNewProjectModal, setShowNewProjectModal] =
    useState<boolean>(false);
  const handleSelectedProject = () => {
    setSelectedProject(null);
  };

  console.log(projects)
  console.log(handleSelectedProject)
  return (
    <section className="flex flex-col w-full flex-1 items-center justify-center p-10">
      {!selectedProject && (
        <div className="flex flex-col w-full flex-1 items-center justify-center gap-4">
          <div className="flex flex-col gap-2 items-center justify-center">
            <h1 className="font-bold text-6xl flex items-center justify-center gap-2 flex-wrap max-lg:text-center">
              Welcome to your
              <span className="text-[var(--color-primary)]">dashboard!</span>
            </h1>
            <p className="opacity-60 text-lg text-center">
              Get started by selecting a project or creating a new one.
            </p>
          </div>

          <div className="flex flex-col ">
            <button
              onClick={() => setShowNewProjectModal(!showNewProjectModal)}
              className="flex gap-2 items-center p-2 border-[--color-text-lightest] border-[1px] rounded-lg"
            >
              <p className="font-bold">Create a new project</p>
            </button>
          </div>

          <div className="flex flex-col gap-4 w-[90%]">
            <h1 className="font-bold text-2xl">Your projects</h1>
            <div className="flex gap-4 w-full overflow-x-scroll p-4">
              {listOfProjects.map((project, index) => (
                <ProjectCard key={index} title={project.title} assignedTo={project.assignedTo} desc=""/>
              ))}
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <Modal
          title="Message"
          desc="hasdsad"
          type="info"
          setShowModal={setShowModal}
          showModal={showModal}
        />
      )}
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
