import Button from "@/components/shared/ui/Button";
import ToggleButton from "@/components/shared/ui/ToggleButton";
import { motion } from "framer-motion";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import useAuth from "@/hooks/useAuth";

const NewProjectModal = ({
  showNewProjectModal,
  setShowNewProjectModal,
}: NewProjectModalProps) => {
  const { isAuthenticated, user } = useAuth();

  if(!isAuthenticated && !user) {
    return null;
  }

  return (
    <motion.div
      className="bg-[--color-text-darker] max-w-[500px] flex-1 flex flex-col p-4 gap-4 rounded-lg z-20 text-white items-center"
      initial={{
        opacity: 0,
        y: 100,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 100,
      }}
    >
      <div className="flex justify-center items-center w-full">
        <h1 className="font-bold text-2xl ml-auto">New Project</h1>
        <Button
          fontAwesomeIconUrl={faXmark}
          className="ml-auto"
          onClick={() => setShowNewProjectModal(!showNewProjectModal)}
        />
      </div>
      <form className="flex flex-col items-start gap-2 w-full">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="title">Title*</label>
          <input
            type="text"
            name="title"
            className="bg-transparent border-[--color-text-lightest] border-[1px] outline-[--color-primary] p-2 rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="type">Type*</label>
          <select
            name="users"
            className="text-white bg-transparent border-[--color-text-lightest] border-[1px] p-2 rounded-lg"
          >
            <option value="public" className="text-black">
              Public
            </option>
            <option value="private" className="text-black">
              Private
            </option>
          </select>
       
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="connections">Connections*</label>
          <div className="bg-transparent border-[1px] p-4 rounded-lg">
          
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="projectName">Created By*</label>
          <input
            type="text"
            name="createdBy"
            className="bg-transparent border-[--color-text-lightest] border-[1px] outline-[--color-primary] p-2 rounded-lg"
            value={user.name}
            readOnly
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="projectName">Created At*</label>
          <input
            type="text"
            name="createdAt"
            className="bg-transparent border-[--color-text-lightest] border-[1px] outline-[--color-primary] p-2 rounded-lg"
            value={new Date().toLocaleString()}
            readOnly
          />
        </div>
        
        <ToggleButton type="submit" className="self-center">
          Create Project
        </ToggleButton>
      </form>
    </motion.div>
  );
};

export default NewProjectModal;
