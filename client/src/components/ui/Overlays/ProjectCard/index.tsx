import { motion } from "framer-motion";
import Button from "@/components/shared/ui/Button";

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
        <li className="p-2">
          <Button variant="clear" onClick={() => {}}>
            Edit
          </Button>
        </li>
        <li className="p-2">
          <Button variant="clear" onClick={() => {}}>
            Delete
          </Button>
        </li>
        <li className="p-2">
          <Button variant="clear" onClick={() => {}}>
            Settings
          </Button>
        </li>
      </ul>
    </motion.div>
  );
};

export default ProjectCardOverlay;
