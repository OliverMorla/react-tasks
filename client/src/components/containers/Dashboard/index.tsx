/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

// UI Components
import NewProjectModal from "@/components/ui/Modals/NewProject";
import DashboardSelectedProject from "@/components/ui/Dashboard/SelectedProject";
import AnimatedDiv from "@/components/helpers/AnimatedDiv";
import ProjectCard from "@/components/ui/Cards/Project";
import Modal from "@/components/shared/ui/Modal";

// Actions
import { getProjectsFromUser } from "@/actions/project-actions";
import { setProjects } from "@/redux/slices/project-slice";

// Hooks
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";

const Dashboard = () => {
  // Redux Dispatch Hook
  const dispatch = useDispatch();

  // Session User
  const { user } = useAuth();

  const { isPending, error, data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjectsFromUser(user.id),
  });

  // // Set Projects to Redux when component mounts
  useEffect(() => {
    if (data) {
      dispatch(setProjects(data));
    }
  }, [isLoading]);

  // Retrieve Projects from Redux
  const projects = useSelector((state: any) => state.projectReducer.projects);

  // Selected Project State
  const [selectedProject, setSelectedProject] = useState<null | ProjectProps>(
    null
  );

  // Modals States
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showNewProjectModal, setShowNewProjectModal] =
    useState<boolean>(false);

  // Handlers
  const handleSelectedProject = () => {
    setSelectedProject(null);
  };

  console.log({
    isPending,
    error,
    data,
    projects,
    handleSelectedProject,
  });

  return (
    <section className="flex flex-col w-full flex-1 items-center justify-center p-10">
      {!selectedProject && (
        <AnimatedDiv className="flex flex-col w-full flex-1 items-center justify-center gap-4">
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
              {projects.map((project: any, index: number) => (
                <ProjectCard
                  key={index}
                  title={project.title}
                  assignedTo={project.assignedTo}
                  desc=""
                />
              ))}
            </div>
          </div>
        </AnimatedDiv>
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
        <AnimatePresence>
          {showNewProjectModal && (
            <motion.div
              className="absolute h-full w-full z-10 flex justify-center items-center p-10"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.5,
                },
              }}
            >
              <div className="absolute h-full w-full z-0 bg-[--color-text-lightest] opacity-80"></div>
              <NewProjectModal
                showNewProjectModal={showNewProjectModal}
                setShowNewProjectModal={setShowNewProjectModal}
              />
            </motion.div>
          )}
        </AnimatePresence>,
        document.getElementById("root") as HTMLElement
      )}
    </section>
  );
};

export default Dashboard;
