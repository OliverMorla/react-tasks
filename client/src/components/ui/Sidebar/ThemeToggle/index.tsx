import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ThemeToggle = () => {
  return (
    <div className="flex items-center bg-[--color-text-lightest] rounded-full m-4 max-h-[35px] h-full max-w-[85px] w-full relative">
      <button className="h-[90%] absolute left-1 rounded-full bg-white w-8 flex items-center justify-center cursor-pointer">
        <FontAwesomeIcon
          icon={faSun}
          width={15}
          height={15}
          className="h-full w-4 "
        />
      </button>
      <button className="h-[90%] absolute right-1 rounded-full w-8 flex items-center justify-center cursor-pointer">
        <FontAwesomeIcon
          icon={faMoon}
          width={15}
          height={15}
          className="h-full w-4 "
        />
      </button>
    </div>
  );
};

export default ThemeToggle;
