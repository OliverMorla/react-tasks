import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/shared/ui/Button";

const NewTaskModal = ({
  projectId,
  showNewTaskModal,
  setShowNewTaskModal,
}: NewTaskModalProps) => {
  const [newTaskInput, setTaskInput] = useState({
    title: "",
    description: "",
    dueDate: "",
    projectId: projectId,
    createdAt: Date.now(),
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement & HTMLInputElement>
  ) => {
    setTaskInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  console.log({
    newTaskInput,
    projectId
  });

  return (
    <motion.div
      className="bg-[var(--color-text-darker)] w-[500px] h-auto flex flex-col p-4 gap-4 rounded-lg z-50 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex justify-center items-center">
        <h1 className="ml-auto font-bold">New Task</h1>
        <Button
          onClick={() => setShowNewTaskModal(!showNewTaskModal)}
          presetIcon="closeCircle"
          className="ml-auto bg-red-500 p-2 rounded-lg hover:bg-red-600 transition-all duration-300 ease-in-out text-white"
        />
      </div>
      <div className="flex items-center justify-center flex-col gap-4">
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="title" className="font-bold">
            Title:
          </label>
          <input
            type="text"
            name="title"
            onChange={handleInputChange}
            placeholder="Enter Task Title"
            className="px-6 py-2 rounded-lg w-full outline-[--color-primary]"
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="description" className="font-bold">
            Description:
          </label>
          <textarea
            placeholder="Enter the task description"
            rows={5}
            name="description"
            onChange={handleInputChange}
            className="w-full px-4 py-2"
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="dueDate" className="font-bold">
            Due Date:
          </label>
          <input
            type="datetime-local"
            name="dueDate"
            onChange={handleInputChange}
            className="w-full text-black p-2 rounded-lg border-[var(--color-primary)] border-[1px]"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default NewTaskModal;
