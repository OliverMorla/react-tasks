import { sidebarMenuLinks } from "@/entities";
import SidebarTitle from "@/components/ui/Sidebar/Title";
import SidebarLink from "@/components/ui/Sidebar/Link";
import SidebarUserBar from "@/components/ui/Sidebar/UserBar";
import SidebarThemeToggle from "@/components/ui/Sidebar/ThemeToggle";
import SidebarLinkWithMenu from "@/components/ui/Sidebar/LinkWithMenu";
import SidebarUpgradeLink from "@/components/ui/Sidebar/UpgradeLink";

const Sidebar = () => {
  return (
    <aside className="max-w-[240px] w-full flex-grow flex flex-col justify-between border-r-[1px] border-r-[--color-text-lightest]">
      <div>
        <SidebarTitle />
        <div>
          <ul className="p-8 flex flex-col gap-6">
            {sidebarMenuLinks.map((item, index) => {
              if (!item.subMenu && item.title.toLowerCase() !== "upgrade") {
                return (
                  <SidebarLink
                    key={index}
                    title={item.title}
                    pathUrl={item.pathUrl}
                    transitionDelay={index}
                    fontAwesomeIconUrl={item.fontAwesomeIconUrl}
                  />
                );
              } else if (item.title.toLowerCase() === "upgrade") {
                return (
                  <SidebarUpgradeLink
                    key={index}
                    title={item.title}
                    pathUrl={item.pathUrl}
                    transitionDelay={index}
                    fontAwesomeIconUrl={item.fontAwesomeIconUrl}
                  />
                );
              } else {
                return (
                  <SidebarLinkWithMenu
                    key={index}
                    title={item.title}
                    pathUrl={item.pathUrl}
                    transitionDelay={index}
                    subMenu={item.subMenu}
                    fontAwesomeIconUrl={item.fontAwesomeIconUrl}
                  />
                );
              }
            })}
          </ul>
        </div>
      </div>
      <div className="relative flex flex-col">
        <SidebarThemeToggle />
        <SidebarUserBar />
      </div>
    </aside>
  );
};

export default Sidebar;
