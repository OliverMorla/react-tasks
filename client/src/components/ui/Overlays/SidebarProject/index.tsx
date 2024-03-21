import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const SidebarProjectOverlay = ({
  setIsSubMenuOpen,
  subMenu,
}: {
  subMenu: SidebarLinkWithMenuProps["subMenu"];
  isSubMenuOpen: boolean;
  setIsSubMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <motion.div
      className="bg-[--color-text-darker] absolute -top-14 z-[1000] -right-36 text-center rounded-lg text-white"
      initial={{
        x: 40,
        opacity: 0,
        zIndex: 1000,
      }}
      animate={{
        x: 0,
        opacity: 1,
        transition: {
          duration: 0.4,
        },
        zIndex: 1000,
      }}
      exit={{
        x: 40,
        opacity: 0,
        transition: {
          duration: 0.4,
        },
      }}
      onHoverEnd={() => {
        setIsSubMenuOpen(false);
      }}
    >
      <ul className="flex flex-col items-center">
        {subMenu?.map((item, index) => (
          <li
            className={`p-4 transition-all hover:bg-[--color-primary] w-full border-b-[--color-primary] border-b-[1px] z-[1000] ${index === subMenu.length - 1 ? "rounded-b-lg" : ""} ${index === 0 ? "rounded-t-lg" : ""}`}
            key={index}
          >
            <Link to={item.pathUrl}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default SidebarProjectOverlay;
