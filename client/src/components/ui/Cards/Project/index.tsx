import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Button from "@/components/shared/ui/Button";
import CollidedUserCard from "@/components/ui/Cards/CollidedUserCard";
import ProjectCardOverlay from "@/components/ui/Overlays/ProjectCard";

import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProjectCard: React.FunctionComponent<ProjectCardProps> = ({
  title,
  dueDate,
  description,
  connections,
  priority,
  status,
  tasks,
  createdAt,
  privacy,
  type,
  ...props
}) => {
  // this state is used to toggle the project card menu
  const [showProjectCardMenu, setShowProjectCardMenu] =
    useState<boolean>(false);

  const removeESLintError = {
    createdAt,
    privacy,
    type,
  };

  console.log(removeESLintError);

  return (
    <div
      {...props}
      className="flex flex-col h-auto bg-gray-50 p-4 rounded-md gap-4 cursor-pointer hover:scale-105 transition-all ease-in-out max-w-[400px] w-full z-0"
      style={{
        boxShadow: "0px 0px 2px 0px var(--color-text-lighter)",
      }}
    >
      <div className="flex justify-between items-center w-full">
        <h1 className="font-bold text-2xl">{title}</h1>
        <div className="relative">
          <Button
            presetIcon="menu"
            className={`min-w-[35px] min-h-[35px] relative z-10 ${
              showProjectCardMenu
                ? "bg-[var(--color-primary)] text-[var(--color-text-lightest)]"
                : "bg-transparent"
            }`}
            variant="transparent"
            name="options-toggle"
            onClick={(e) => {
              e.stopPropagation();
              setShowProjectCardMenu(!showProjectCardMenu);
            }}
          />
          <AnimatePresence>
            {showProjectCardMenu && <ProjectCardOverlay />}
          </AnimatePresence>
        </div>
      </div>

      <p className="text-sm opacity-60">
        {description && description.length > 100
          ? description.slice(0, 100) + "..."
          : description}
      </p>

      <div className="flex gap-2 items-center justify-between opacity-60 text-sm">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faClipboard} width={25} height={25} />
          <div className="flex items-center gap-1">
            <span>{tasks?.length}</span>
            <span>Tasks</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span>Priority:</span>
          <span>{priority}</span>
        </div>
        <div className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <span className="font-bold">Due Date:</span>
            <span>{new Date(dueDate).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center">
          {connections ? (
            <CollidedUserCard connections={connections} />
          ) : (
            "No Users Assigned"
          )}
        </div>
        <div className="flex items-center opacity-60 gap-2">
          <ProjectCardStatus status={status} />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

// =================== UI Components =================== //
interface ProjectCardStatusProps {
  status: string;
}

const ProjectCardStatus = ({ status }: ProjectCardStatusProps) => {
  return (
    <div
      className={`p-2 rounded-lg flex items-center font-bold ${
        status === "Completed" ? "bg-green-400" : "bg-orange-400"
      }`}
    >
      <p>{status}</p>
    </div>
  );
};
