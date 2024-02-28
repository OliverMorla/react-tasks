/* eslint-disable @typescript-eslint/no-explicit-any */
interface HeaderNavLinkProps {
  title?: string;
  pathUrl: string;
  fontAwesomeIconUrl?: any;
  iconUrl?: URL;
  transitionDelay?: number;
}

interface FooterNavLinkProps extends HeaderNavLinkProps {}

