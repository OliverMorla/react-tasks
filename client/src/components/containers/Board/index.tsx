import { useState } from "react";
import { faEllipsis, faPlus } from "@fortawesome/free-solid-svg-icons";

import BoardAssignedUsers from "@/components/ui/Board/AssignedUsers";
import BoardSearchTasks from "@/components/ui/Board/SearchTasks";
import BoardNewTaskToggles from "@/components/ui/Board/NewTaskToggles";
import { AnimatePresence, motion } from "framer-motion";

import Button from "@/components/shared/ui/Button";
import TaskCard from "@/components/ui/Cards/Task";
import NewTaskModal from "@/components/ui/Modals/NewTask";

const Board = () => {
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);

  return (
    <section className="relative flex flex-col w-full h-full">
      <div className="flex gap-2 flex-col border-b-[--color-text-lightest] border-b-[1px] p-8">
        <div className="flex justify-between flex-wrap max-md:gap-4">
          <div className="flex text-xs gap-4">
            <p className="opacity-60">Projects</p>
            <span>{">"}</span>
            <p className="font-bold">Personal</p>
          </div>
          <BoardNewTaskToggles
            showNewTaskModal={showNewTaskModal}
            setShowNewTaskModal={setShowNewTaskModal}
          />
        </div>
        <h1 className="font-bold text-4xl">My Tasks</h1>
        <BoardAssignedUsers />
      </div>
      <BoardSearchTasks />
      <div className="flex flew-grow w-full bg-[--color-text-lightest] overflow-y-scroll">
        <div className=" flex-grow w-full px-4 py-6">
          <div className="bg-gray-200 flex flex-col w-fit p-4">
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
            <div className="flex flex-col gap-4 mt-4">
              <TaskCard />
              <TaskCard />
              <TaskCard />
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
              <TaskCard />
              <TaskCard />
              <TaskCard />
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
              <TaskCard />
              <TaskCard />
              <TaskCard />
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showNewTaskModal && (
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
        )}
      </AnimatePresence>
    </section>
  );
};

export default Board;
