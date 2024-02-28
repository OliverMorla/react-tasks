import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const FooterNavLink = ({
  title,
  fontAwesomeIconUrl,
  pathUrl,
}: FooterNavLinkProps) => {
  return (
    <motion.li
      className="transition-all cursor-pointer opacity-60 w-fit"
      whileHover={{
        fontWeight: "bold",
      }}
    >
      <Link to={pathUrl} className="flex gap-2 items-center">
        {fontAwesomeIconUrl && (
          <FontAwesomeIcon icon={fontAwesomeIconUrl} width={25} height={25} />
        )}
        {title}
      </Link>
    </motion.li>
  );
};

export default FooterNavLink;
