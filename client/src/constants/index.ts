import { faFlipboard } from "@fortawesome/free-brands-svg-icons";

import {
  faCalendar,
  faClipboard,
  faMessage,
} from "@fortawesome/free-regular-svg-icons";

import {
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
    tags: [],
    title: "Improve cards readability",
    desc: "As a team license owner, I want to use multiplied limits",
    createdAt: "21/03/22",
  },
  {
    tags: [],
    title: "Improve cards readability",
    desc: "As a team license owner, I want to use multiplied limits",
    createdAt: "21/03/22",
  },
  {
    tags: [],
    title: "Improve cards readability",
    desc: "As a team license owner, I want to use multiplied limits",
    createdAt: "21/03/22",
  },
];

export { navPrimaryLinks, sidebarMenuLinks, usersAssigned, listOfTasks };
