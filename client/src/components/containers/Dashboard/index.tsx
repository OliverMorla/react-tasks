/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

// UI Components
import AnimatedDiv from "@/components/helpers/AnimatedDiv";
import NewProjectModal from "@/components/ui/Modals/NewProject";
import DashboardSelectedProject from "@/components/ui/Dashboard/SelectedProject";
import ProjectCard from "@/components/ui/Cards/Project";
import LoadingAnimation from "@/components/ui/Loading";
import Button from "@/components/shared/ui/Button";

// Actions
import { getProjectsFromUser } from "@/actions/project-actions";
import { setProjects } from "@/redux/slices/project-slice";

// Hooks
import { useSelector, useDispatch } from "react-redux";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";

const Dashboard = () => {
  const queryClient = useQueryClient();

  // Local State
  const [selectedProject, setSelectedProject] = useState<null | ProjectProps>(
    null
  );
  const [showNewProjectModal, setShowNewProjectModal] =
    useState<boolean>(false);

  // Redux Dispatch Hook
  const dispatch = useDispatch();

  // Session User
  const { user } = useAuth();

  // Fetch Projects from API using React Query
  const { error, data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => {
      if (user?.id) {
        return getProjectsFromUser(user.id);
      }
    },
  });

  useEffect(() => {
    return () => {
      queryClient.clear();
    };
  }, []);

  // // Set Projects to Redux when component mounts
  useEffect(() => {
    if (data) {
      dispatch(setProjects(data));
    }
  }, [data]);

  // Retrieve Projects from Redux
  const projects: ProjectProps[] = useSelector(
    (state: any) => state.projectReducer.projects
  );

  return (
    <section
      className={`flex flex-col w-full flex-1 items-center justify-center ${
        selectedProject ? "" : "p-10"
      }`}
    >
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
            <Button
              onClick={() => setShowNewProjectModal(!showNewProjectModal)}
              variant="transparent"
              className="p-2"
            >
              <p className="font-bold">Create a new project</p>
            </Button>
          </div>

          <div className="flex flex-col gap-4 w-[90%]">
            <h1 className="font-bold text-2xl">Your projects</h1>
            <div className="flex gap-4 w-full overflow-x-scroll p-4">
              {isLoading && !error && <LoadingAnimation />}
              {projects &&
                projects.map((project, index) => (
                  <ProjectCard
                    key={index}
                    id={project.id}
                    title={project.title}
                    tasks={project.tasks}
                    connections={project.connections}
                    type={project.type}
                    description={project.description}
                    dueDate={project.dueDate}
                    createdAt={project.createdAt}
                    priority={project.priority}
                    tags={project.tags}
                    privacy={project.privacy}
                    status={project.status}
                    onClick={() => setSelectedProject(project)}
                  />
                ))}
            </div>
          </div>
        </AnimatedDiv>
      )}

      {selectedProject && (
        <DashboardSelectedProject
          key={selectedProject.id}
          id={selectedProject.id}
          title={selectedProject.title}
          status={selectedProject.status}
          type={selectedProject.type}
          description={selectedProject.description}
          dueDate={selectedProject.dueDate}
          priority={selectedProject.priority}
          tags={selectedProject.tags}
          createdAt={selectedProject.createdAt}
          privacy={selectedProject.privacy}
          // tasks={selectedProject.tasks}
          connections={selectedProject.connections}
        />
      )}

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
