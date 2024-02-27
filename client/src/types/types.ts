/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

interface HeaderNavLinkProps {
  title?: string;
  pathUrl: string;
  fontAwesomeIconUrl?: any;
  iconUrl?: URL;
  transitionDelay?: number;
}

interface FooterNavLinkProps extends HeaderNavLinkProps {}

interface SidebarLinkWithMenuProps extends HeaderNavLinkProps {
  transitionDelay: number;
}

interface sidebarLinkProps extends HeaderNavLinkProps {
  transitionDelay: number;
}
