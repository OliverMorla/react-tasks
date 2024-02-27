import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownWideShort,
  faArrowUpWideShort,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/shared/Button";

const SearchTasks = () => {
  return (
    <div className="flex justify-between py-4 px-8 border-b-[--color-text-lightest] border-b-[1px] items-center">
      <div className="relative flex items-center">
        <input
          type="text"
          name="search"
          placeholder="Search"
          className="outline-[--color-text-lightest] border-[--color-text-lightest] border-[1px] py-2 px-10 rounded-lg"
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          width={25}
          height={25}
          className="absolute left-2 opacity-60"
        />
      </div>
      <div>
        <ul className="flex gap-2">
          <li>
            <Button
              fontAwesomeIconUrl={faArrowUpWideShort}
              className="border-[--color-text-lightest] border-[1px] p-1 rounded-lg opacity-60 hover:opacity-100 transition-all duration-300 ease-in-out"
              action={() => {}}
            />
          </li>
          <li>
            <Button
              fontAwesomeIconUrl={faArrowDownWideShort}
              className="border-[--color-text-lightest] border-[1px] p-1 rounded-lg opacity-60 hover:opacity-100 transition-all duration-300 ease-in-out"
              action={() => {}}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SearchTasks;
