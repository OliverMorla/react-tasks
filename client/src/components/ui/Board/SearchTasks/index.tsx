import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownWideShort,
  faArrowUpWideShort,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import ToggleButton from "@/components/shared/ui/ToggleButton";

const BoardSearchTasks = () => {
  const [searchInput, setSearchInput] = useState<string>("");

  const handleSearch = () => {}

  return (
    <div className="flex justify-between py-4 px-8 border-b-[--color-text-lightest] border-b-[1px] items-center">
      <div className="relative flex items-center">
        <input
          type="text"
          name="search"
          placeholder="Search"
          onChange={(e) => setSearchInput(e.target.value)}
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
            <ToggleButton
              fontAwesomeIconUrl={faArrowUpWideShort}
              onClick={() => {}}
            />
          </li>
          <li>
            <ToggleButton
              fontAwesomeIconUrl={faArrowDownWideShort}
              onClick={() => {}}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BoardSearchTasks;
