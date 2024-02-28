import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const ProjectsModal = ({
  setIsSubMenuOpen,
}: {
  isSubMenuOpen: boolean;
  setIsSubMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <motion.div
      className="bg-[--color-text-lightest] absolute top-6 z-10 -right-9 text-center rounded-lg"
      initial={{
        y: 40,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.4,
        },
      }}
      onHoverEnd={() => {
        setIsSubMenuOpen(false);
      }}
    >
      <ul className="flex flex-col items-center">
        <li className="p-4 transition-all hover:bg-[--color-primary] w-full border-b-slate-400 border-b-[1px] rounded-t-lg">
          <Link to={"/"}>Personal</Link>
        </li>
        <li className="p-4 transition-all hover:bg-[--color-primary] w-full rounded-b-lg">
          <Link to={"/"}>Shared</Link>
        </li>
      </ul>
    </motion.div>
  );
};

export default ProjectsModal;
