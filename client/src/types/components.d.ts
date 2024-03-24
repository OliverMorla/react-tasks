/* eslint-disable @typescript-eslint/no-explicit-any */

/* ======== UI Shared Components Interfaces/Types ======== */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  readonly title?: string;
  fontAwesomeIconUrl?: any;
  pathUrl?: string;
  variant?: "transparent" | "color" | "clear";
  presetIcon?:
    | "closeCircle"
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
  readonly id: string;
  readonly tags: ["Bug" | "Feedback"];
  readonly title: string;

  userId?: string | number;
  user?: UserProps;

  projectId?: string | number;
  project?: ProjectProps;

  readonly description: string;
  readonly priority: "High" | "Medium" | "Low";
  readonly status: "InProgress" | "Backlog" | "ToDo";
  readonly createdAt: Date;
  readonly dueDate: Date;
  readonly comments?: CommentProps[];
}

interface ProjectCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ProjectProps {}

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
  projectId: string;
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

interface TasksProps extends TaskCardProps {}

interface UserProps {
  readonly id: string;
  readonly name: string;
  email?: string;
  password?: string;
  readonly photoUrl: string;
  readonly role: "User" | "Admin";

  projects?;
  commnents?;
  connections?;
  tasks?;
}

interface CommentProps {
  readonly id: string | number;

  userId?: string | number;
  user?: UserProps;

  taskId?: string | number;
  task?: Task;

  readonly text: string;
  readonly createdAt: Date | string;
}

interface ProjectProps {
  readonly id: string;
  title: string;
  description?: string;
  readonly status: "In Progress" | "Completed";
  tags?: string[];

  readonly userId?: string;
  readonly user?: UserProps;

  readonly priority: "High" | "Medium" | "Low";
  readonly type: "Personal" | "Shared";
  readonly privacy: "Public" | "Private" | "Archived";
  readonly createdAt: Date;
  readonly dueDate: Date;

  readonly connections?: ConnectionProps[];
  readonly tasks?: TasksProps[];
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

interface LoadingAnimationProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  dimensions?: {
    width: number;
    height: number;
  };
}

interface SignInInputProps {
  email: string;
  password: string;
}

interface SignUpInputProps {
  firstName?: string;
  lastName?: string;
  email: string;
  name?: string;
  password: string;
  passwordConfirm: string;
}
