import Button from "@/components/shared/ui/Button";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

const SidebarUserBar = () => {
  return (
    <div className="flex items-center justify-center gap-4 pb-8 pt-4 border-t-[--color-text-lightest] border-t-[1px]">
      <img
        src="/assets/icons/user.svg"
        width={50}
        height={50}
        className="opacity-60"
      />
      <div className="flex flex-col text-sm">
        <h1 className="font-bold">Donye</h1>
        <p className="opacity-60">collins@brees.com</p>
      </div>
      <Button
        fontAwesomeIconUrl={faEllipsis}
        className="border-[--color-text-lightest] border-[1px] p-1 rounded-lg opacity-60 hover:opacity-100 transition-all duration-300 ease-in-out"
      />
    </div>
  );
};

export default SidebarUserBar;
