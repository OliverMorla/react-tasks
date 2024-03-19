import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/shared/ui/Button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTasksByID } from "@/actions/tasks-actions";
import overflowRemover from "@/utils/overflow";
// import DashboardAssignedUsers from "../../Dashboard/AssignedUsers";

const TaskModal = ({ setShowTaskModal, showTaskModal, id }: TaskModalProps) => {
  const queryClient = useQueryClient();

  const [newCommentInput, setNewCommentInput] = useState<string>("");

  const { data, error, isLoading, isPending } = useQuery<TasksProps>({
    queryKey: ["task", id],
    queryFn: () => getTasksByID(id as string),
    enabled: !!id,
  });

  useEffect(() => {
    return () => {
      if (!showTaskModal) {
        queryClient.removeQueries({ queryKey: ["task", id] });
      }
    };
  }, [data, id, queryClient, showTaskModal]);

  useEffect(() => {
    overflowRemover(showTaskModal);
    // Cleanup function to ensure the style is reset when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showTaskModal]);

  const handleCommentInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCommentInput(e.target.value);
  };

  console.log({
    id,
    data,
    isLoading,
    isPending,
    error,
  });

  console.log(newCommentInput);

  return (
    <motion.div
      className="bg-gray-100 w-[500px] h-auto flex flex-col p-4 gap-4 rounded-lg z-50 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {isLoading && !error && (
        <img
          src="/assets/spinners/Loading-3.svg"
          alt="loading.gif"
          width={50}
          height={50}
          className="ml-auto mr-auto"
        />
      )}
      {data ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex justify-center items-center">
            <h1 className="font-bold">{data.title}</h1>
            <Button
              onClick={() => setShowTaskModal(!showTaskModal)}
              presetIcon="close"
              className="bg-red-500 p-2 rounded-lg hover:bg-red-600 transition-all duration-300 ease-in-out text-white absolute right-0 mr-2"
            />
          </div>
          <div className="flex items-center justify-center border-t-[1px] border-b-[1px] py-10 mt-10">
            {data.description}
          </div>
          <div>
            <div className="flex justify-between items-center mt-10">
              <div className="flex items-center gap-2">
                <span className="font-bold">Created at:</span>
                <span className="bg-green-400 rounded-lg p-1">
                  {new Date(data.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Due date:</span>
                <span className="bg-orange-400 rounded-lg p-1">
                  {new Date(data.dueDate).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">Status:</span>
              <span>
                {data.status === "ToDo"
                  ? "To Do"
                  : data.status === "InProgress"
                  ? "In Progress"
                  : data.status}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-10">
            <div className="flex items-center justify-between border-b-[1px] border-b-gray-200 pb-2">
              <h1 className="font-bold">Comments</h1>
              <div>
                {/* <DashboardAssignedUsers connections={data.Comment} /> */}
              </div>
            </div>
            <div className="max-h-[250px] overflow-y-scroll flex flex-col gap-4 p-2">
              {data.Comment?.map((comment, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex flex-col items-center justify-center">
                    <img
                      src={comment.User?.photoUrl}
                      alt={`${comment.User?.name}-photo`}
                      width={50}
                      height={50}
                    />
                    <span className="text-center text-sm">
                      {comment.User?.name}
                    </span>
                  </div>
                  <div className="flex flex-col bg-gray-200 rounded-lg px-4 py-2">
                    <span>{comment.text}</span>
                    <span className="text-end opacity-60">
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <form>
              <input
                type="text"
                placeholder="Enter a comment"
                className="rounded-lg w-full p-2 outline-[var(--color-primary)] bg-gray-50"
                value={newCommentInput}
                onChange={handleCommentInput}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    console.log("Pressed!");
                  }
                }}
              />
            </form>
          </div>
        </motion.div>
      ) : null}
    </motion.div>
  );
};

export default TaskModal;
