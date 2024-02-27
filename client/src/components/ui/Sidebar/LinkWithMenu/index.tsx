import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SidebarLinkWithMenu = ({
  title,
  fontAwesomeIconUrl,
  transitionDelay,
}: SidebarLinkWithMenuProps) => {
  return (
    <motion.li
      className="flex gap-2 items-center transition-all cursor-pointer opacity-60 w-fit"
      whileHover={{
        borderBottom: "1px solid",
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
          duration: 1,
        },
      }}
    >
      {fontAwesomeIconUrl && <FontAwesomeIcon icon={fontAwesomeIconUrl} />}
      <span>{title}</span>
    </motion.li>
  );
};

export default SidebarLinkWithMenu;
