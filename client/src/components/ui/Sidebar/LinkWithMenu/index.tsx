import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ProjectsModal from "../../Modals/Projects";

const SidebarLinkWithMenu = ({
  title,
  fontAwesomeIconUrl,
  transitionDelay,
  pathUrl,
}: SidebarLinkWithMenuProps) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState<boolean>(false);
  return (
    <motion.li
      className="transition-all cursor-pointer w-full relative"
      whileHover={{
        opacity: 1,
      }}
      initial={{
        x: -100,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
        transition: {
          delay: transitionDelay * 0.1,
          duration: 0.8,
        },
      }}
      whileTap={{
        scale: 0.95,
        color: "var(--color-primary)",
      }}
    >
      <Link to={pathUrl} className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {fontAwesomeIconUrl && (
            <FontAwesomeIcon icon={fontAwesomeIconUrl} width={25} height={25} />
          )}
          {title}
        </div>
        <motion.div
          onHoverStart={() => {
            setIsSubMenuOpen(true);
          }}
          className={`transition-all ${isSubMenuOpen ? "rotate-180" : ""}`}
        >
          <FontAwesomeIcon icon={faCaretUp} width={25} height={25} />
        </motion.div>
      </Link>
      {isSubMenuOpen && (
        <ProjectsModal
          setIsSubMenuOpen={setIsSubMenuOpen}
          isSubMenuOpen={isSubMenuOpen}
        />
      )}
    </motion.li>
  );
};

export default SidebarLinkWithMenu;
