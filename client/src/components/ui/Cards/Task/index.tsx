import Button from "@/components/shared/ui/Button";
import { faFlag } from "@fortawesome/free-regular-svg-icons";
import { faEllipsis, faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import TaskTagCard from "../TaskTag";

const TaskCard = () => {
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
        <TaskTagCard
          title="Feeback"
          backgroundColor="bg-red-200"
          textColor="text-red-600"
        />
        <TaskTagCard
          title="Bug"
          backgroundColor="bg-green-200"
          textColor="text-green-600"
        />
      </div>
      <div className="flex justify-between w-full items-center">
        <h1 className="font-bold text-2xl">Task Title</h1>
        <Button
          fontAwesomeIconUrl={faEllipsis}
          className="border-[--color-text-lightest] border-[1px] p-1 rounded-lg opacity-60 hover:opacity-100 transition-all duration-300 ease-in-out"
        />
      </div>
      <div>
        <p className="opacity-60">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi
          cupiditate porro quasi mollitia alias reprehenderit totam eligendi
          dicta maiores magnam. Quibusdam at quis optio. At eaque delectus
          repellat atque praesentium?
        </p>
      </div>
      <div className="flex justify-between w-full items-center opacity-60">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faFlag} width={25} height={25} />
          <p>21/03/22</p>
        </div>
        <span>
          <p>D-18</p>
        </span>
      </div>
      <div className="flex justify-between w-full items-center">
        <img
          src="/assets/images/users/dummy-1.png"
          alt="user"
          width={25}
          height={25}
        />
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
