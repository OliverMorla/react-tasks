import ToggleButton from "@/components/shared/ui/ToggleButton";

const NewProjectModal = ({
  showNewProjectModal,
  setShowNewProjectModal,
}: NewProjectModalProps) => {
  const handleNewProject = () => {
    setShowNewProjectModal(!showNewProjectModal);
  };

  console.log(handleNewProject);
  return (
    <div className="bg-[--color-text-darker] max-w-[500px] flex-1 flex flex-col p-4 gap-4 rounded-lg z-20 text-white items-center">
      <h1 className="font-bold text-2xl">New Project</h1>
      <form className="flex flex-col items-start gap-2 w-full">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="projectName">Name*</label>
          <input
            type="text"
            name="projectName"
            className="bg-transparent border-[--color-text-lightest] border-[1px] outline-[--color-primary] p-2 rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="projectName">Type*</label>
          <input
            type="text"
            name="projectName"
            className="bg-transparent border-[--color-text-lightest] border-[1px] outline-[--color-primary] p-2 rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="projectName">Users*</label>
          <input
            type="text"
            name="projectName"
            className="bg-transparent border-[--color-text-lightest] border-[1px] outline-[--color-primary] p-2 rounded-lg"
          />
        </div>
        <ToggleButton type="submit" className="self-center">
          Create Project
        </ToggleButton>
      </form>
    </div>
  );
};

export default NewProjectModal;
