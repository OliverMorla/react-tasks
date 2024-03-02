import { faFlipboard } from "@fortawesome/free-brands-svg-icons";

import {
  faCalendar,
  faClipboard,
  faMessage,
} from "@fortawesome/free-regular-svg-icons";

import {
  faCartShopping,
  faDiagramProject,
  faLayerGroup,
  faList,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

const navPrimaryLinks = [
  {
    title: "Board",
    pathUrl: "/",
    fontAwesomeIconUrl: faFlipboard,
  },
  {
    title: "List",
    pathUrl: "/tab/list",
    fontAwesomeIconUrl: faList,
  },
  {
    title: "Calendar",
    pathUrl: "/tab/calendar",
    fontAwesomeIconUrl: faCalendar,
  },
];

const sidebarMenuLinks = [
  {
    title: "Dashboard",
    pathUrl: "/dashboard",
    fontAwesomeIconUrl: faDiagramProject,
  },
  {
    title: "Projects",
    pathUrl: "/projects",
    fontAwesomeIconUrl: faLayerGroup,
    subMenu: [
      {
        title: "Shared",
        pathUrl: "/projects?category=shared",
      },
      {
        title: "Private",
        pathUrl: "/projects?category=private",
      },
    ],
  },
  {
    title: "Tasks",
    pathUrl: "/tasks",
    fontAwesomeIconUrl: faClipboard,
  },
  {
    title: "Messages",
    pathUrl: "/messages",
    fontAwesomeIconUrl: faMessage,
  },
  {
    title: "Users",
    pathUrl: "/users",
    fontAwesomeIconUrl: faUserGroup,
  },
  {
    title: "Upgrade",
    pathUrl: "/upgrade",
    fontAwesomeIconUrl: faCartShopping,
  },
];

const usersAssigned = [
  {
    userPhoto: "/assets/images/users/dummy-1.png",
  },
  {
    userPhoto: "/assets/images/users/dummy-2.png",
  },
  {
    userPhoto: "/assets/images/users/dummy-3.png",
  },
  {
    userPhoto: "/assets/images/users/dummy-4.png",
  },
];

const listOfTasks = [
  {
    tags: ["Feedback", "Bug", "Improvement"],
    title: "Improve cards readability",
    desc: "lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi cupiditate porro quasi mollitia alias reprehenderit totam eligendi dicta maiores magnam. Quibusdam at quis optio. At eaque delectus repellat atque praesentium",
    users: [
      "/assets/images/users/dummy-1.png",
      "/assets/images/users/dummy-2.png",
    ],
    comments: "3",
    createdAt: "21/03/22",
    status: "In Progress",
  },
  {
    tags: ["Feedback", "Bug"],
    title: "Improve cards readability",
    desc: "lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi cupiditate porro quasi mollitia alias reprehenderit totam eligendi dicta maiores magnam. Quibusdam at quis optio. At eaque delectus repellat atque praesentium",
    users: [
      {
        userPhoto: "/assets/images/users/dummy-1.png",
        userName: "John Doe",
      },
      {
        userPhoto: "/assets/images/users/dummy-2.png",
        userName: "Jane Doe",
      },
    ],
    comments: "3",
    createdAt: "21/03/22",
    status: "In Progress",
  },
  {
    tags: ["Improvement"],
    title: "Improve cards readability",
    desc: "lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi cupiditate porro quasi mollitia alias reprehenderit totam eligendi dicta maiores magnam. Quibusdam at quis optio. At eaque delectus repellat atque praesentium",
    users: [
      {
        userPhoto: "/assets/images/users/dummy-1.png",
        userName: "John Doe",
      },
    ],
    comments: "3",
    createdAt: "21/03/22",
    status: "To do",
  },
  {
    tags: ["Improvement"],
    title: "Improve cards readability",
    desc: "lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi cupiditate porro quasi mollitia alias reprehenderit totam eligendi dicta maiores magnam. Quibusdam at quis optio. At eaque delectus repellat atque praesentium",
    users: [
      {
        userPhoto: "/assets/images/users/dummy-1.png",
        userName: "John Doe",
      },
    ],
    comments: "3",
    createdAt: "21/03/22",
    status: "Backlog",
  },
];

const userSession = {
  name: "John Doe",
  email: "johndoe@reacttasks.com",
  photo: "/assets/images/users/dummy-1.png",
  role: "User",
};

const adminSession = {
  name: "Oliver Morla",
  email: "olivermorla@reacttasks.com",
  photo: "/assets/images/users/dummy-1.png",
  role: "Admin",
};

const listOfAvailableUsers = [
  {
    name: "John Doe",
    email: "johndoe@realtasks.com",
    photo: "/assets/images/users/dummy-1.png",
  },
  {
    name: "Jane Doe",
    email: "",
    photo: "/assets/images/users/dummy-2.png",
  },
  {
    name: "Frank Doe",
    email: "",
    photo: "/assets/images/users/dummy-3.png",
  },
  {
    name: "Jenny Doe",
    email: "",
    photo: "/assets/images/users/dummy-4.png",
  },
];

const listOfPrices = [
  {
    title: "Basic",
    tagline: "A Basic/Free Plan with Limited Features",
    price: 0,
    discountedPrice: 0,
    features: {
      pros: ["5 Free Tasks", "5 Free Projects"],
      cons: [
        "Limited Resources",
        "Priority Updates",
        "Priority Customer Support",
      ],
    },
  },
  {
    title: "Premium",
    tagline: "Good enough! Just almost everything you need!",
    price: 49,
    discountedPrice: 59,
    features: {
      pros: ["20 Free Tasks", "10 Free Projects", "Priority Updates"],
      cons: ["Limited Resources", "Priority Customer Support"],
    },
  },
  {
    title: "CEO",
    tagline: "The Power is on your hands!",
    price: 99,
    discountedPrice: 129,
    features: {
      pros: [
        "Unlimited Tasks",
        "Unlimited Projects",
        "Priority Updates",
        "Priority Customer Support",
        "Access to Messages",
      ],
    },
  },
];

export {
  navPrimaryLinks,
  sidebarMenuLinks,
  usersAssigned,
  listOfTasks,
  listOfAvailableUsers,
  userSession,
  adminSession,
  listOfPrices,
};
