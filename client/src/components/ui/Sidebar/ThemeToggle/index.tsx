import Button from "@/components/shared/ui/Button";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const SidebarThemeToggle = () => {
  return (
    <div className="flex items-center bg-[--color-text-lightest] rounded-full m-4 max-h-[35px] h-full max-w-[85px] w-full relative">
      <Button
        className="h-[90%] absolute left-1 rounded-full bg-white w-8 flex items-center justify-center cursor-pointer"
        fontAwesomeIconUrl={faSun}
      />
      <Button
        className="h-[90%] absolute right-1 rounded-full w-8 flex items-center justify-center cursor-pointer"
        fontAwesomeIconUrl={faMoon}
      />
    </div>
  );
};

export default SidebarThemeToggle;
