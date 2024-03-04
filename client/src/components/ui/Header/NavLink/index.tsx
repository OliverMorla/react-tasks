import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const HeaderNavLink = ({
  title,
  pathUrl,
  fontAwesomeIconUrl,
}: HeaderNavLinkProps) => {
  return (
    <motion.li
      className="transition-all cursor-pointer opacity-60 w-fit max-sm:border-[1px] max-sm:border-[--color-text-lightest] max-sm:p-2 max-sm:rounded-md max-sm:hover:opacity-100 duration-300 ease-in-out max-sm:hover:bg-[--color-text-dark] max-sm:hover:text-[--color-text-lightest] flex justify-center items-center"
      whileHover={{
        fontWeight: "bold",
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

export default HeaderNavLink;
