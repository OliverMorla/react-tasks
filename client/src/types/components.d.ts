/* eslint-disable @typescript-eslint/no-explicit-any */
interface ButtonProps {
  title?: string;
  fontAwesomeIconUrl: any;
  pathUrl?: string;
  className?: string;
  onClick?: () => any;
}

interface ToggleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  iconSettings?: {
    width: number;
    height: number;
  };
  fontAwesomeIconUrl?: any;
}
