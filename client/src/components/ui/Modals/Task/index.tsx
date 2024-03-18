import { motion } from "framer-motion";
import Button from "@/components/shared/ui/Button";
import { useQuery } from "@tanstack/react-query";
import { getTasksByID } from "@/actions/tasks-actions";
const TaskModal = ({ setShowTaskModal, showTaskModal, id }: TaskModalProps) => {
  const { data, error, isLoading, isPending } = useQuery({
    queryKey: ["Task"],
    queryFn: () => getTasksByID(id as string),
  });

  console.log({
    id,
    data,
    isLoading,
    isPending,
    error,
  });

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
          onClick={() => setShowTaskModal(!showTaskModal)}
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

export default TaskModal;
