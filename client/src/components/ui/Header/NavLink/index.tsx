import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavLink = ({
  title,
  pathUrl,
  fontAwesomeIconUrl,
  iconUrl,
  transitionDelay,
}: HeaderNavLinkProps) => {
  return (
    <motion.li
      className="flex gap-2 items-center transition-all cursor-pointer opacity-60 w-fit"
      whileHover={{
        borderBottom: "1px solid",
      }}
    >
      {fontAwesomeIconUrl && <FontAwesomeIcon icon={fontAwesomeIconUrl} />}
      {title}
    </motion.li>
  );
};

export default NavLink;
