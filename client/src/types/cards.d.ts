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
  users: TaskCardUser[];
  tags: string[];
  dueDate: string;
  status: TaskCardStatus;
  priority: TaskCardPriority;
  comments: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  assignedTo: string;
  assignedBy: string;
}
