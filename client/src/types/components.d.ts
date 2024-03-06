/* eslint-disable @typescript-eslint/no-explicit-any */

/* ======== UI Shared Components Interfaces/Types ======== */
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

/* ======== UI Components Interfaces/Types ======== */
interface PriceCardProps {
  title: string;
  tagline: string;
  price: number;
  features: {
    pros?: string[];
    cons?: string[];
  };
  discountedPrice?: number;
  transitionDelay: number;
}

type TaskCardStatus = "In Progress" | "Backlog" | "To Do";
type TaskCardPriority = "High" | "Medium" | "Low";
type TaskCardUser = {
  photo: string;
  userName: string;
};

interface TaskCardProps {
  title: string;
  desc: string;
  assignedTo: TaskCardUser[];
  tags: string[];
  dueDate: string;
  status: TaskCardStatus;
  priority: TaskCardPriority;
  comments: string;
  createdAt: string;
  updatedAt: string;
}

interface SidebarLinkWithMenuProps {
  title: string;
  fontAwesomeIconUrl?: any;
  transitionDelay: number;
  pathUrl: string;
  iconUrl?: URL;
  subMenu?: any[];
}

interface SidebarLinkProps {
  title: string;
  fontAwesomeIconUrl?: any;
  transitionDelay: number;
  iconUrl?: URL;
  pathUrl: string;
}

interface HeaderNavLinkProps {
  title?: string;
  pathUrl: string;
  fontAwesomeIconUrl?: any;
  iconUrl?: URL;
  transitionDelay?: number;
}

interface FooterNavLinkProps extends HeaderNavLinkProps {}

interface TaskTagsProps {
  title: string;
  backgroundColor: string;
  textColor: string;
}

interface NewTaskModalProps {
  showNewTaskModal: boolean;
  setShowNewTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface NewProjectModalProps {
  showNewProjectModal: boolean;
  setShowNewProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface NewTaskTogglesProps extends NewTaskModalProps {}

interface ProjectProps {}
