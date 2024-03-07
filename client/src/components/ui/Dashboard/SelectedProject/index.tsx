import Button from "@/components/shared/ui/Button";
import TaskCard from "@/components/ui/Cards/Task";
import DashboardAssignedUsers from "@/components/ui/Dashboard/AssignedUsers";
import DashboardNewTaskToggles from "@/components/ui/Dashboard/NewTaskToggles";
import DashboardSearchTasks from "@/components/ui/Dashboard/SearchTasks";
import NewTaskModal from "@/components/ui/Modals/NewTask";
import { listOfTasks } from "@/entities";
import { faEllipsis, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

const DashboardSelectedProject = () => {
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex flex-col border-b-[var(--color-text-lightest)] border-b-[1px] gap-4 p-10">
        <div className="flex justify-between flex-wrap max-md:gap-4">
          <div className="flex items-center text-xs gap-4">
            <p className="opacity-60">Projects</p>
            <span>{">"}</span>
            <p className="opacity-60">Personal</p>
            <span>{">"}</span>
            <p className="font-bold">Personal</p>
          </div>
          <DashboardNewTaskToggles
            showNewTaskModal={showNewTaskModal}
            setShowNewTaskModal={setShowNewTaskModal}
          />
        </div>
        <h1 className="font-bold text-4xl">My Tasks</h1>
        <DashboardAssignedUsers />
      </div>
      <DashboardSearchTasks />

      <div className="flex w-full h-full bg-[--color-text-lightest] p-4">
        <div className="flex flex-col h-full w-full">
          <div className="bg-gray-200 flex flex-col w-full p-4 h-fit">
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-lg text-[--color-text-light]">
                Backlog
              </h1>
              <div className="flex">
                <Button
                  fontAwesomeIconUrl={faPlus}
                  className="border-[--color-text-lightest] border-[1px] p-1 rounded-lg opacity-60 hover:opacity-100 transition-all duration-300 ease-in-out"
                />
                <Button
                  fontAwesomeIconUrl={faEllipsis}
                  className="border-[--color-text-lightest] border-[1px] p-1 rounded-lg opacity-60 hover:opacity-100 transition-all duration-300 ease-in-out"
                />
              </div>
            </div>

            <div className="flex flex-col">
              {listOfTasks.map((task, index) => (
                <TaskCard
                  key={index}
                  title={task.title}
                  desc={task.desc}
                  tags={task.tags}
                  status={task.status as TaskCardStatus}
                  priority={task.priority as TaskCardPriority}
                  createdAt={task.createdAt}
                  assignedTo={task.users}
                  comments={task.comments}
                  dueDate={task.dueDate}
                  updatedAt={task.updatedAt}
                />
              ))}
            </div>
          </div>
        </div>

        <div className=" flex-grow w-full px-4 py-6">
          <div className="bg-gray-200 flex flex-col w-fit p-4">
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-lg text-[--color-text-light]">
                To Do (4)
              </h1>
              <div className="flex">
                <Button
                  fontAwesomeIconUrl={faPlus}
                  className="border-[--color-text-lightest] border-[1px] p-1 rounded-lg opacity-60 hover:opacity-100 transition-all duration-300 ease-in-out"
                />
                <Button
                  fontAwesomeIconUrl={faEllipsis}
                  className="border-[--color-text-lightest] border-[1px] p-1 rounded-lg opacity-60 hover:opacity-100 transition-all duration-300 ease-in-out"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-4">
              {/* <TaskCard /> */}
              {/* <TaskCard /> */}
              {/* <TaskCard /> */}
            </div>
          </div>
        </div>
        <div className=" flex-grow w-full px-4 py-6">
          <div className="bg-gray-200 flex flex-col w-fit p-4">
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-lg text-[--color-text-light]">
                In Progress (3)
              </h1>
              <div className="flex">
                <Button
                  fontAwesomeIconUrl={faPlus}
                  className="border-[--color-text-lightest] border-[1px] p-1 rounded-lg opacity-60 hover:opacity-100 transition-all duration-300 ease-in-out"
                />
                <Button
                  fontAwesomeIconUrl={faEllipsis}
                  className="border-[--color-text-lightest] border-[1px] p-1 rounded-lg opacity-60 hover:opacity-100 transition-all duration-300 ease-in-out"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-4">
              {/* <TaskCard /> */}
              {/* <TaskCard /> */}
              {/* <TaskCard /> */}
            </div>
          </div>
        </div>
      </div>
      {createPortal(
        false && (
          <div className="absolute h-full w-full z-10 flex justify-center items-center">
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
        ),
        document.getElementById("root") as HTMLElement
      )}
    </div>
  );
};

export default DashboardSelectedProject;
