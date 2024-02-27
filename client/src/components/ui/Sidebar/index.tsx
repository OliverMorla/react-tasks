import { sidebarMenuLinks } from "@/constants";
import SidebarTitle from "@/components/ui/Sidebar/Title";
import SidebarLink from "@/components/ui/Sidebar/Link";
import UserMenu from "@/components/ui/Sidebar/UserMenu";
import ThemeToggle from "@/components/ui/Sidebar/ThemeToggle";
import SidebarLinkWithMenu from "./LinkWithMenu";

const Sidebar = () => {
  return (
    <aside className="max-w-[240px] min-w-[240px] w-full flex flex-col border-r-[1px] border-r-[--color-text-lightest]">
      <SidebarTitle />

      <div>
        <ul className="p-8 flex flex-col gap-6">
          {sidebarMenuLinks.map((item, index) => {
            if (!item.subMenu) {
              return (
                <SidebarLink
                  key={index}
                  transitionDelay={index}
                  title={item.title}
                  pathUrl={item.pathUrl}
                  fontAwesomeIconUrl={item.fontAwesomeIconUrl}
                />
              );
            } else {
              return (
                <SidebarLinkWithMenu
                  key={index}
                  transitionDelay={index}
                  title={item.title}
                  pathUrl={item.pathUrl}
                  fontAwesomeIconUrl={item.fontAwesomeIconUrl}
                  subMenu={item.subMenu}
                />
              );
            }
          })}
        </ul>
      </div>

      <div className="flex h-full justify-end flex-col">
        <ThemeToggle />
        <UserMenu />
      </div>
    </aside>
  );
};

export default Sidebar;
