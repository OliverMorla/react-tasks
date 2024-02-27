import {
  faArrowUpWideShort,
  faEllipsis,
  faGear,
  faMagnifyingGlass,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchTasksSection from "./components/ui/Board/SearchTasksSection";

const App = () => {
  return (
    <main className="flex w-full h-full flex-col ">
      <div className="flex gap-2 flex-col border-b-[--color-text-lightest] border-b-[1px] p-8">
        <div className="flex justify-between">
          <div className="flex text-xs">
            <p>Projects</p>
            <span>{">"}</span>
            <p>International</p>
            <span>{">"}</span>
            <p>Product Web</p>
          </div>
          <div className="flex gap-2 items-center">
            <button>
              <FontAwesomeIcon icon={faGear} width={25} height={25} />
            </button>
            <button>
              <FontAwesomeIcon icon={faEllipsis} width={25} height={25} />
            </button>
            <button>
              <FontAwesomeIcon icon={faPlus} width={25} height={25} />
              New Task
            </button>
          </div>
        </div>
        <div>
          <h1 className="font-bold text-4xl">My Tasks</h1>
        </div>
        <div className="flex">
          <img
            src="/assets/icons/user.svg"
            width={50}
            height={50}
            className="opacity-60"
          />
          <img
            src="/assets/icons/user.svg"
            width={50}
            height={50}
            className="opacity-60"
          />
          <img
            src="/assets/icons/user.svg"
            width={50}
            height={50}
            className="opacity-60"
          />
        </div>
      </div>

      <SearchTasksSection />

      <div className="bg-[--color-text-lightest] h-full w-full"></div>
    </main>
  );
};

export default App;
