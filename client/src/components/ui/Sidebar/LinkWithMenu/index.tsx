import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const SidebarLinkWithMenu = ({
  title,
  fontAwesomeIconUrl,
  transitionDelay,
  pathUrl,
}: SidebarLinkWithMenuProps) => {
  return (
    <motion.li
      className="transition-all cursor-pointer w-fit"
      whileHover={{
        borderBottom: ".5px solid var(--color-text-lightest)",
        opacity: 1,
      }}
      initial={{
        x: -100,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 0.6,
        transition: {
          delay: transitionDelay * 0.1,
          duration: 0.5,
        },
      }}
    >
      <Link to={pathUrl} className="flex gap-2 items-center">
        {fontAwesomeIconUrl && <FontAwesomeIcon icon={fontAwesomeIconUrl} />}
        <span>{title}</span>
        <FontAwesomeIcon icon={faCaretDown} width={25} height={25} />
      </Link>
    </motion.li>
  );
};

export default SidebarLinkWithMenu;
