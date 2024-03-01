import { sidebarMenuLinks } from "@/entities";

import SidebarTitle from "@/components/ui/Sidebar/Title";
import SidebarLink from "@/components/ui/Sidebar/Link";
import SidebarUserBar from "@/components/ui/Sidebar/UserBar";
import SidebarThemeToggle from "@/components/ui/Sidebar/ThemeToggle";
import SidebarLinkWithMenu from "@/components/ui/Sidebar/LinkWithMenu";
import SidebarUpgradeLink from "./UpgradeLink";

const Sidebar = () => {
  return (
    <aside className="max-w-[240px] min-w-[240px] flex flex-col border-r-[1px] border-r-[--color-text-lightest]">
      <SidebarTitle />
      <div>
        <ul className="p-8 flex flex-col gap-6">
          {sidebarMenuLinks.map((item, index) => {
            if (!item.subMenu && item.title.toLowerCase() !== "upgrade"){
              return (
                <SidebarLink
                  key={index}
                  transitionDelay={index}
                  title={item.title}
                  pathUrl={item.pathUrl}
                  fontAwesomeIconUrl={item.fontAwesomeIconUrl}
                />
              );
            } else if (item.title.toLowerCase() === "upgrade") {
              return (
                <SidebarUpgradeLink
                  title={item.title}
                  fontAwesomeIconUrl={item.fontAwesomeIconUrl}
                  transitionDelay={index}
                  pathUrl={item.pathUrl}
                  key={index}
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
        <SidebarThemeToggle />
        <SidebarUserBar />
      </div>
    </aside>
  );
};

export default Sidebar;
