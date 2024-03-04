import ToggleButton from "@/components/shared/ui/ToggleButton";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

const SidebarUserBar = () => {
  return (
    <div className="flex items-center justify-center gap-3 border-t-[--color-text-lightest] border-t-[1px] p-4">
      <img
        src="/assets/images/users/dummy-2.png"
        width={35}
        height={35}
        className="opacity-60"
      />
      <div className="flex flex-col text-xs max-sm:hidden">
        <h1 className="font-bold">John</h1>
        <p className="opacity-60">johndoe@tasks.com</p>
      </div>
      <ToggleButton
        fontAwesomeIconUrl={faEllipsis}
        className="min-w-[35px] min-h-[35px]"
        onClick={() => console.log("clicked")}
      />
    </div>
  );
};

export default SidebarUserBar;
