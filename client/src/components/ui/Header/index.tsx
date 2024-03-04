import { navPrimaryLinks } from "@/entities";
import HeaderNavLink from "@/components/ui/Header/NavLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faGear, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/shared/ui/Button";

const Header = () => {
  return (
    <header
      className="max-h-[65px] min-h-[65px] h-full border-b-[--color-text-lightest] border-b-[1px] flex justify-center items-center"
      role="heading"
    >
      <nav className="flex justify-between items-center w-full max-sm:justify-center max-sm:gap-1 max-sm:p-2">
        <ul className="list-none flex gap-8 px-4 max-sm:gap-2 max-sm:px-0">
          {navPrimaryLinks.map((item, index) => (
            <HeaderNavLink
              key={index}
              title={item.title}
              pathUrl={item.pathUrl}
              fontAwesomeIconUrl={item.fontAwesomeIconUrl}
            />
          ))}
        </ul>

        <div className="flex items-center px-4 gap-4 max-sm:px-0">
          <div className="relative flex items-center justify-center max-lg:hidden">
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
          <ul className="flex gap-4 max-sm:gap-2">
            <li>
              <Button
                fontAwesomeIconUrl={faBell}
                className="border-[--color-text-lightest] border-[1px] p-1 rounded-lg opacity-60 hover:opacity-100 transition-all duration-300 ease-in-out"
              />
            </li>
            <li>
              <Button
                fontAwesomeIconUrl={faGear}
                className="border-[--color-text-lightest] border-[1px] p-1 rounded-lg opacity-60 hover:opacity-100 transition-all duration-300 ease-in-out"
              />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
