import React from "react";

import { FaHome, FaUsers, FaBiohazard } from "react-icons/fa";
import { ImLab } from "react-icons/im";
import { GoGraph } from "react-icons/go";
import { RiComputerLine } from "react-icons/ri";
import { MdTimeline } from "react-icons/md";

export const NavbarData = [
  {
    name: "Home",
    path: "/home",
    icon: <FaHome />,
    current: true
  },

  {
    name: "Users",
    path: "/users",
    icon: <FaUsers />,
    current: false
 
  },

  {
    name: "Virtual Machines",
    path: "/virtual_machines",
    icon: <RiComputerLine />,
    current: false
  },

  {
    name: "Labs",
    path: "/labs",
    icon: <ImLab />,
    current: false
  },

  {
    name: "Resources",
    path: "/resources",
    icon: <GoGraph />,
    current: false
  },

  {
    name: "Analysis",
    path: "/analysis",
    icon: <MdTimeline />,
    current: false

  },

  {
    name: "Sandbox",
    path: "/sandbox",
    icon: <FaBiohazard />,
    current: false
  },
];

export const userNavigation = [
  { name: 'Your Profile', path: '#' },
  { name: 'Settings', path: '#' },
  { name: 'Sign out', path: '#' },
]
