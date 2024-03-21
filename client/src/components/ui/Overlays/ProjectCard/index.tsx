import { motion } from "framer-motion";
import Button from "@/components/shared/ui/Button";

const projectCardMenuItems = [
  {
    name: "Edit",
  },
  {
    name: "Delete",
  },
  {
    name: "Settings",
  },
];

const ProjectCardOverlay = () => {
  return (
    <motion.div
      className="absolute bg-[var(--color-text-darker)] text-[var(--color-text-lightest)] left-0 top-0 rounded-lg"
      initial={{
        opacity: 0,
        x: 40,
        translateX: "70%",
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: 40,
      }}
    >
      <ul className="flex flex-col items-center">
        {projectCardMenuItems.map((item, index) => (
          <li key={index} className="h-full w-full">
            <Button
              variant="clear"
              name={item.name}
              onClick={(e) => {
                e.stopPropagation();
                console.log(item.name);
              }}
              className={`transition-all hover:bg-[var(--color-primary)] p-2 w-full h-full ${
                index === 0 ? "rounded-t-lg" : ""
              } ${
                index === projectCardMenuItems.length - 1 ? "rounded-b-lg" : ""
              }`}
            >
              {item.name}
            </Button>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default ProjectCardOverlay;
