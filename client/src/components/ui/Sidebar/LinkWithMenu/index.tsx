import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import SidebarProjectOverlay from "../../Overlays/SidebarProject";

const SidebarLinkWithMenu = ({
  title,
  fontAwesomeIconUrl,
  transitionDelay,
  pathUrl,
  subMenu,
}: SidebarLinkWithMenuProps) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState<boolean>(false);
  return (
    <motion.li
      className="transition-all cursor-pointer relative"
      initial={{
        x: -100,
        opacity: 0,
      }}
      whileHover={{
        opacity: 1,
      }}
      animate={{
        x: 0,
        opacity: .6,
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
          <span className="max-sm:hidden">{title}</span>
        </div>
        <motion.div
          onHoverStart={() => {
            setIsSubMenuOpen(true);
          }}
          className={`max-sm:hidden transition-all ${isSubMenuOpen ? "rotate-90" : ""}`}
        >
          <FontAwesomeIcon icon={faCaretUp} width={25} height={25} />
        </motion.div>
      </Link>
      <AnimatePresence>
        {isSubMenuOpen && (
          <SidebarProjectOverlay
            subMenu={subMenu}
            setIsSubMenuOpen={setIsSubMenuOpen}
            isSubMenuOpen={isSubMenuOpen}
          />
        )}
      </AnimatePresence>
    </motion.li>
  );
};

export default SidebarLinkWithMenu;
