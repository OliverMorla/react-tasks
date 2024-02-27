import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserMenu = () => {
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
      <button className="border-[--color-text-lightest] border-[1px] rounded-lg">
        <FontAwesomeIcon icon={faEllipsis} width={25} height={50} />
      </button>
    </div>
  );
};

export default UserMenu;
