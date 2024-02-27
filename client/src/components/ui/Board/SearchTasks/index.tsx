import {
  faArrowUpWideShort,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchTasks = () => {
  return (
    <section className="flex justify-between py-4 px-8 border-b-[--color-text-lightest] border-b-[1px] items-center">
      <div className="relative flex items-center">
        <input
          type="text"
          name="search"
          placeholder="Search"
          className="outline-[--color-text-lightest] border-[--color-text-lightest] border-[1px] py-2 px-10"
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          width={25}
          height={25}
          className="absolute left-2 opacity-60"
        />
      </div>
      <div>
        <ul>
          <li>
            <button>
              <FontAwesomeIcon
                icon={faArrowUpWideShort}
                width={25}
                height={25}
              />
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default SearchTasks;
