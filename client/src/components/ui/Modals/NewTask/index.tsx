import Button from "@/components/shared/ui/Button";
import { motion } from "framer-motion";

const NewTaskModal = ({
  showNewTaskModal,
  setShowNewTaskModal,
}: NewTaskModalProps) => {
  return (
    <motion.div
      className="bg-gray-100 w-[500px] h-auto flex flex-col p-4 gap-4 rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, zIndex: 1000 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex justify-center items-center">
        <h1 className="ml-auto font-bold">New Task</h1>
        <Button
          onClick={() => setShowNewTaskModal(!showNewTaskModal)}
          presetIcon="close"
          className="ml-auto bg-red-500 p-2 rounded-lg hover:bg-red-600 transition-all duration-300 ease-in-out text-white"
        />
      </div>
      <div className="flex items-center justify-center">
        <input
          type="text"
          name="new-task"
          placeholder="Enter Task Title"
          className="px-6 py-2 rounded-lg w-full outline-[--color-primary]"
        />
      </div>
    </motion.div>
  );
};

export default NewTaskModal;
