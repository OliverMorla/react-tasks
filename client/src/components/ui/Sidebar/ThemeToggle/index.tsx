import Button from "@/components/shared/ui/Button";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SidebarThemeToggle = () => {
  const [selectedTheme, setSelectedTheme] = useState<"light" | "dark">("light");
  const togglerRef = useRef<HTMLDivElement>(null);
  return (
    <div className="flex items-center bg-[--color-text-lightest] rounded-full min-h-[35px] max-w-[85px] w-full relative m-4">
      <motion.div
        className="h-[90%] absolute left-1 rounded-full bg-white w-8 flex items-center justify-center cursor-pointer transition-all"
        ref={togglerRef}
        onClick={() => {
          if (togglerRef.current?.classList.contains(`translate-x-[45px]`)) {
            togglerRef.current?.classList.remove(`translate-x-[45px]`);
            setSelectedTheme("light");
          } else {
            togglerRef.current?.classList.add(`translate-x-[45px]`);
            setSelectedTheme("dark");
          }
        }}
      >
        <FontAwesomeIcon icon={selectedTheme === "light" ? faSun : faMoon} className="text-[--color-text-darker]" />
      </motion.div>
      {/* <Button
        className="h-[90%] absolute left-1 rounded-full w-8 flex items-center justify-center cursor-pointer"
        fontAwesomeIconUrl={faSun}
      />
      <Button
        className="h-[90%] absolute right-1 rounded-full w-8 flex items-center justify-center cursor-pointer"
        fontAwesomeIconUrl={faMoon}
      /> */}
    </div>
  );
};

export default SidebarThemeToggle;
