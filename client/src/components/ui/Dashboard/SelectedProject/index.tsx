import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/shared/ui/Button";
import TaskCard from "@/components/ui/Cards/Task";
import DashboardSearchTasks from "@/components/ui/Dashboard/SearchTasks";
import NewTaskModal from "@/components/ui/Modals/NewTask";
import DashboardAssignedUsers from "@/components/ui/Dashboard/AssignedUsers";
import DashboardNewTaskToggles from "@/components/ui/Dashboard/NewTaskToggles";
import { getTasksFromProject } from "@/actions/tasks-actions";
import { pageLoadVariant } from "@/config/framer-variants";
import { useQuery } from "@tanstack/react-query";

const DashboardSelectedProject = ({
  title,
  privacy,
  createdAt,
  connections,
  desc,
  dueDate,
  id,
  priority,
  tags,
  type,
}: // tasks,
ProjectProps) => {
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const { data, isPending, error, isLoading } = useQuery<{
    tasks: TasksProps[];
  }>({
    queryKey: ["tasks"],
    queryFn: () => getTasksFromProject(parseInt(id as string)),
  });

  const tasks = data?.tasks;

  useEffect(() => {
    if (showNewTaskModal) {
      // When the modal is shown, add overflow: hidden to the body
      document.body.style.overflow = "hidden";
    } else {
      // When the modal is not shown, remove the style (or set it to 'auto', depending on your needs)
      document.body.style.overflow = "auto";
    }

    // Cleanup function to ensure the style is reset when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showNewTaskModal]);

  // testing purposes
  console.log({
    title,
    privacy,
    createdAt,
    desc,
    dueDate,
    id,
    priority,
    tags,
    type,
    tasks,
    isPending,
    error,
    isLoading,
  });

  return (
    <motion.div
      className="flex flex-col w-full"
      variants={pageLoadVariant}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col border-b-[var(--color-text-lightest)] border-b-[1px] gap-4 p-10">
        <div className="flex justify-between flex-wrap max-md:gap-4">
          <div className="flex items-center text-xs gap-4">
            <p className="opacity-60">Projects</p>
            <span>{">"}</span>
            <p className="opacity-60">{type}</p>
            <span>{">"}</span>
            <p className="font-bold">{title}</p>
          </div>
          <DashboardNewTaskToggles
            showNewTaskModal={showNewTaskModal}
            setShowNewTaskModal={setShowNewTaskModal}
          />
        </div>
        <h1 className="font-bold text-4xl">My Tasks</h1>
        <DashboardAssignedUsers connections={connections!} />
      </div>
      <DashboardSearchTasks />

      <div className="flex w-full h-full bg-gray-50 p-4 gap-4 overflow-x-scroll">
        <div className="flex flex-col h-full w-full">
          <div className="p-4 bg-gray-100 flex flex-col w-full h-auto gap-4 rounded-lg">
            <div className="flex justify-between items-center">
              <h1 className="text-lg text-[--color-text-light]">
                Backlog ({tasks?.length})
              </h1>
              <div className="flex items-center gap-2">
                <Button
                  presetIcon="plus"
                  variant="transparent"
                  className="opacity-60 hover:opacity-100 hover:text-[var(--color-primary)] border-[var(--color-text-light)]"
                />
                <Button
                  presetIcon="menu"
                  variant="transparent"
                  className="opacity-60 hover:opacity-100 hover:text-[var(--color-primary)] border-[var(--color-text-light)]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {isLoading && !error && (
                <img
                  src="/assets/spinners/Loading-3.svg"
                  alt=""
                  width={50}
                  height={50}
                  className="ml-auto mr-auto"
                />
              )}

              {tasks?.map((task, index) => (
                <TaskCard
                  title={task.title}
                  desc={task.desc}
                  tags={task.tags}
                  dueDate={task.dueDate}
                  createdAt={task.createdAt}
                  priority={task.priority}
                  status={task.status}
                  key={index}
                  id={task.id.toString()}
                  comments={task.comments}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col h-full w-full">
          <div className="p-4 bg-gray-100 flex flex-col w-full h-auto gap-4 rounded-lg">
            <div className="flex justify-between items-center">
              <h1 className="text-lg text-[--color-text-light]">
                Backlog ({tasks?.length})
              </h1>
              <div className="flex items-center gap-2">
                <Button
                  presetIcon="plus"
                  variant="transparent"
                  className="opacity-60 hover:opacity-100 hover:text-[var(--color-primary)] border-[var(--color-text-light)]"
                />
                <Button
                  presetIcon="menu"
                  variant="transparent"
                  className="opacity-60 hover:opacity-100 hover:text-[var(--color-primary)] border-[var(--color-text-light)]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {isLoading && !error && (
                <img
                  src="/assets/spinners/Loading-3.svg"
                  alt=""
                  width={50}
                  height={50}
                  className="ml-auto mr-auto"
                />
              )}

              {tasks?.map((task, index) => (
                <TaskCard
                  title={task.title}
                  desc={task.desc}
                  tags={task.tags}
                  dueDate={task.dueDate}
                  createdAt={task.createdAt}
                  priority={task.priority}
                  status={task.status}
                  key={index}
                  id={task.id.toString()}
                  comments={task.comments}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col h-full w-full">
          <div className="p-4 bg-gray-100 flex flex-col w-full h-auto gap-4 rounded-lg">
            <div className="flex justify-between items-center">
              <h1 className="text-lg text-[--color-text-light]">
                Backlog ({tasks?.length})
              </h1>
              <div className="flex items-center gap-2">
                <Button
                  presetIcon="plus"
                  variant="transparent"
                  className="opacity-60 hover:opacity-100 hover:text-[var(--color-primary)] border-[var(--color-text-light)]"
                />
                <Button
                  presetIcon="menu"
                  variant="transparent"
                  className="opacity-60 hover:opacity-100 hover:text-[var(--color-primary)] border-[var(--color-text-light)]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {isLoading && !error && (
                <img
                  src="/assets/spinners/Loading-3.svg"
                  alt=""
                  width={50}
                  height={50}
                  className="ml-auto mr-auto"
                />
              )}

              {tasks?.map((task, index) => (
                <TaskCard
                  title={task.title}
                  desc={task.desc}
                  tags={task.tags}
                  dueDate={task.dueDate}
                  createdAt={task.createdAt}
                  priority={task.priority}
                  status={task.status}
                  key={index}
                  id={task.id.toString()}
                  comments={task.comments}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
          {showNewTaskModal && (
            <div className="absolute h-full w-full z-50 flex justify-center items-center">
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
              <NewTaskModal
                showNewTaskModal={showNewTaskModal}
                setShowNewTaskModal={setShowNewTaskModal}
              />
            </div>
          )}
        </AnimatePresence>,
        document.getElementById("root") as HTMLElement
      )}
    </motion.div>
  );
};

export default DashboardSelectedProject;
