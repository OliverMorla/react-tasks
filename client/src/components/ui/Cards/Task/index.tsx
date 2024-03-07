import { faFlag } from "@fortawesome/free-regular-svg-icons";
import { faEllipsis, faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import TaskTagCard from "../TaskTag";
import ToggleButton from "@/components/shared/ui/ToggleButton";

const TaskCard = ({
  title,
  desc,
  assignedTo,
  // comments,
  tags,
  // dueDate,
  // priority,
  // status,
  createdAt,
  // updatedAt,
  // createdBy,
  // updatedBy,
  // assignedTo,
  // assignedBy,
}: TaskCardProps) => {
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
    >
      <div className="flex gap-2 text-sm">
        {tags.map((tag, index) => (
          <TaskTagCard
            key={index}
            title={tag}
            backgroundColor={tag !== "Bug" ? "bg-green-200" : "bg-red-200"}
            textColor={tag !== "Bug" ? "text-green-600" : "text-red-600"}
          />
        ))}
      </div>
      <div className="flex justify-between w-full items-center transit`">
        <h1 className="font-bold text-2xl">{title}</h1>
        <ToggleButton
          fontAwesomeIconUrl={faEllipsis}
          className="min-w-[35px] min-h-[35px]"
        />
      </div>
      <div>
        <p className="opacity-60">
          {desc.length > 100 ? desc.slice(0, 100) + "..." : desc}
        </p>
      </div>
      <div className="flex justify-between w-full items-center opacity-60">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faFlag} width={25} height={25} />
          <p>{createdAt}</p>
        </div>
        <span>
          <p>D-18</p>
        </span>
      </div>
      <div className="flex w-full items-center">
        {assignedTo?.map((user, index) => (
          <>
            <img
              src={user?.photo}
              alt="user"
              width={25}
              height={25}
              className="w-10 h-10 rounded-full overflow-hidden border-slate-500 border-[.5px]"
              style={{
                zIndex: assignedTo.length - index,
                transform: `translateX(-${index * 10}px)`,
              }}
            />
          </>
        ))}

        <div className="flex items-center opacity-60 gap-2">
          <FontAwesomeIcon icon={faMessage} width={25} height={25} />
          <p className="flex gap-1">
            <span>3</span>
            <span>Comments</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;
