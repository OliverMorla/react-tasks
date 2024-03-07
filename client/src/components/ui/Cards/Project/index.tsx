import Button from "@/components/shared/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboard,
  faEllipsis,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";

const ProjectCard = ({ title, assignedTo }: ProjectCardProps) => {
  return (
    <div
      className="flex flex-col h-auto bg-white p-4 rounded-md gap-4 cursor-pointer hover:scale-105 transition-all ease-in-out max-w-[400px] w-full"
      style={{
        boxShadow: "0px 0px 2px 0px var(--color-text-lighter)",
      }}
    >
      <div className="flex gap-2 text-sm"></div>
      <div className="flex justify-between w-full items-center">
        <h1 className="font-bold text-2xl">{title}</h1>
        <Button
          fontAwesomeIconUrl={faEllipsis}
          className="min-w-[35px] min-h-[35px]"
          variant="transparent"
          name="options-toggle"
          onClick={() => {}}
        />
      </div>
      <div>
        <p className="opacity-60">
          {/* {desc.length > 100 ? desc.slice(0, 100) + "..." : desc} */}
        </p>
      </div>
      <div className="flex gap-2 items-center opacity-60">
        <FontAwesomeIcon icon={faClipboard} width={25} height={25} />
        <p className="flex gap-1">
          <span>3</span>
          <span>Tasks</span>
        </p>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center">
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
        </div>

        <div className="flex items-center opacity-60 gap-2">
          <FontAwesomeIcon icon={faMessage} width={25} height={25} />
          <p className="flex gap-1">
            <span>3</span>
            <span>Comments</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
