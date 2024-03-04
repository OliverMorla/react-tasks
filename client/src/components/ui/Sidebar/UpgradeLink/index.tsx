import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SidebarUpgradeLink = ({
  title,
  fontAwesomeIconUrl,
  transitionDelay,
  pathUrl,
}: SidebarLinkProps) => {
  return (
    <motion.li
      className="transition-all cursor-pointer bg-[--color-primary] text-[--color-text-lightest] rounded-md p-3 hover:bg-[--color-text-dark] hover:text-[--color-text-lightest] flex justify-center items-center"
      whileHover={{
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
          duration: 0.8,
        },
      }}
      whileTap={{
        scale: 0.95,
        color: "var(--color-primary)",
      }}
    >
      <Link to={pathUrl} className="flex gap-2 items-center">
        {fontAwesomeIconUrl && (
          <FontAwesomeIcon icon={fontAwesomeIconUrl} width={25} height={25} />
        )}
        <span className="max-sm:hidden">{title}</span>
      </Link>
    </motion.li>
  );
};

export default SidebarUpgradeLink;
