import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const SidebarLink = ({
  title,
  fontAwesomeIconUrl,
  transitionDelay,
  pathUrl,
}: sidebarLinkProps) => {
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
      </Link>
    </motion.li>
  );
};

export default SidebarLink;
