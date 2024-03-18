import { faFlag } from "@fortawesome/free-regular-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, MotionProps, motion } from "framer-motion";
// import TaskTagCard from "./TaskTag";
import Button from "@/components/shared/ui/Button";
import { createPortal } from "react-dom";
import { useState } from "react";
import TaskModal from "@/components/ui/Modals/Task";

const TaskCard = ({
  title,
  desc,
  createdAt,
  dueDate,
  id,
  priority,
  status,
  tags,
  comments,
  ...props
}: TaskCardProps & MotionProps) => {
  // console.log({
  //   title,
  //   desc,
  //   createdAt,
  //   dueDate,
  //   id,
  //   priority,
  //   status,
  //   tags,
  //   comments,
  // });
  const [showTaskModal, setShowTaskModal] = useState(false);
  return (
    <motion.div
      className="w-full flex flex-col h-auto bg-white p-4 rounded-md gap-4 cursor-pointer"
      style={{
        boxShadow: "0px 0px 2px 0px var(--color-text-lighter)",
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0px 0px 2px 0px var(--color-primary)",
      }}
      whileTap={{
        scale: 0.98,
        cursor: "grabbing",
      }}
      {...props}
    >
      <div className="flex gap-2 text-sm">
        {/* {tags.map((tag, index) => (
          <TaskTagCard
            key={index}
            title={tag}
            backgroundColor={tag !== "Bug" ? "bg-green-200" : "bg-red-200"}
            textColor={tag !== "Bug" ? "text-green-600" : "text-red-600"}
          />
        ))} */}
      </div>
      <div className="flex justify-between w-full items-center transit`">
        <h1 className="font-bold text-2xl">{title}</h1>
        <Button
          presetIcon="menu"
          className="min-w-[35px] min-h-[35px]"
          variant="transparent"
          onClick={(e) => {
            e.stopPropagation();
            console.log("child");
          }}
        />
      </div>
      <div>
        <p className="opacity-60">
          {desc && desc.length > 100 ? desc.slice(0, 100) + "..." : desc}
        </p>
      </div>
      <div className="flex justify-between w-full items-center opacity-60">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faFlag} width={25} height={25} />
          <p>
            {createdAt instanceof Date ? createdAt.toLocaleString() : createdAt}
          </p>
        </div>
        <span>
          <p>D-18</p>
        </span>
      </div>
      <div className="flex w-full items-center">
        <div className="flex items-center opacity-60 gap-2">
          <FontAwesomeIcon icon={faMessage} width={25} height={25} />
          <p className="flex gap-1">
            <span>3</span>
            <span>Comments</span>
          </p>
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
          {showTaskModal && (
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
              <TaskModal
                showTaskModal={showTaskModal}
                setShowTaskModal={setShowTaskModal}
              />
            </div>
          )}
        </AnimatePresence>,
        document.getElementById("root") as HTMLElement
      )}
    </motion.div>
  );
};

export default TaskCard;
