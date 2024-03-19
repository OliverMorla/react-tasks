/* eslint-disable @typescript-eslint/no-explicit-any */

/* ======== UI Shared Components Interfaces/Types ======== */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  readonly title?: string;
  fontAwesomeIconUrl?: any;
  pathUrl?: string;
  variant?: "transparent" | "color" | "clear";
  presetIcon?:
    | "close"
    | "menu"
    | "settings"
    | "plus"
    | "notification"
    | "plusCircle";
  iconDimensions?: {
    width: number;
    height: number;
  };
}

interface ModalProps {
  readonly showModal: boolean;
  readonly setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  readonly title: string;
  readonly desc: string;
  type: "success" | "error" | "warning" | "info";
}

interface AnimatedDivProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface AnimatedSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/* ======== UI Components Interfaces/Types ======== */

/* ======== Cards ======== */

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

interface TaskCardProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly id: string | number;
  readonly tags: ["Bug" | "Feedback"];
  readonly title: string;

  userId?: string | number;
  user?: UserProps;

  projectId?: string | number;
  project?: ProjectProps;

  readonly description: string;
  readonly priority: "High" | "Medium" | "Low";
  readonly status: "InProgress" | "Backlog" | "ToDo";
  readonly createdAt: Date | string;
  readonly dueDate: Date | string;
  readonly Comment?: CommentProps[];
}

interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly id: string | number;
  readonly tags: string[];
  readonly status: "In Progress" | "Completed";
  readonly title: string;

  userId?: string | number;
  user?: UserProps;

  readonly desc: string;
  readonly priority: "High" | "Medium" | "Low";
  readonly type: "Personal" | "Shared";
  readonly connections?: UserProps[];
  readonly privacy: "Public" | "Private" | "Archived";
  readonly createdAt: Date | string;
  readonly dueDate: Date | string;
}

interface ProjectUserCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  photoUrl: string;
}

/* ======== ====== ======== */

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

/* ======== Modal ======== */

interface NewTaskModalProps {
  showNewTaskModal: boolean;
  setShowNewTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface NewProjectModalProps {
  showNewProjectModal: boolean;
  setShowNewProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TaskModalProps {
  id: string | number;
  showTaskModal: boolean;
  setShowTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface NewProjectModalInputProps {
  title: string;
  type: string;
  connections: any[];
  createdBy: string;
  createdAt: string;
}

/* ======== ====== ======== */

interface NewTaskTogglesProps extends NewTaskModalProps {}

interface ProjectProps {
  readonly id: string | number;
  readonly tags: string[];
  readonly status: "In Progress" | "Completed";
  readonly title: string;

  userId?: string | number;
  user?: UserProps;

  readonly desc: string;
  readonly priority: "High" | "Medium" | "Low";
  readonly type: "Personal" | "Shared";
  readonly privacy: "Public" | "Private" | "Archived";
  readonly connections?: UserProps[];
  readonly createdAt: Date | string;
  readonly dueDate: Date | string;

  tasks?: TasksProps[];
}

interface TasksProps extends TaskCardProps {}

interface UserProps {
  User: {
    readonly id: string | number;
    name: string;
    email: string;
    password?: string;
    photoUrl: string;
  };
}

interface CommentUserProps {
  readonly id: string | number;
  name: string;
  email: string;
  password?: string;
  photoUrl: string;
}

interface CommentProps {
  readonly id: string | number;

  userId?: string | number;
  User?: CommentUserProps;

  taskId?: string | number;
  task?: Task;

  readonly text: string;
  readonly createdAt: Date | string;
}

interface ConnectionProps {
  readonly id: string | number;

  userId?: string | number;
  user?: UserProps;

  projectId?: string | number;
  project?: ProjectProps;

  readonly createdAt: Date | string;
}

interface UserSessionProps {
  id: string;
  name: string;
  email: string;
  photo: string;
  role: "User" | "Admin";
}
