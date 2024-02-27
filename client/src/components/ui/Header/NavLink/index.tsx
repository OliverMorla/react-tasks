import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const NavLink = ({
  title,
  pathUrl,
  fontAwesomeIconUrl,
}: HeaderNavLinkProps) => {
  return (
    <motion.li
      className="transition-all cursor-pointer opacity-60 w-fit"
      whileHover={{
        borderBottom: "1px solid",
      }}
    >
      <Link to={pathUrl} className="flex gap-2 items-center">
        {fontAwesomeIconUrl && <FontAwesomeIcon icon={fontAwesomeIconUrl} />}
        <span>{title}</span>
      </Link>
    </motion.li>
  );
};

export default NavLink;
