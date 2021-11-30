import React from 'react';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

import { FaHome, FaUsers, FaBiohazard } from "react-icons/fa";
import { ImLab } from "react-icons/im";
import { GoGraph } from "react-icons/go";
import { MdTimeline } from "react-icons/md";


export const SidebarData = [
  {
    title: 'Home',
    path: '/home',
    icon: <FaHome />,
    
  },


  {
    title: 'Users',
    path: '/users',
    icon: <FaUsers />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav:
     [
      {
        title: 'Reports',
        path: '/users/reports',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      }
     ]
  },


  {
    title: 'Labs',
    path: '/labs',
    icon: <ImLab />
  },


  {
    title: 'Resources',
    path: '/resources',
    icon: <GoGraph />
  },


  {
    title: 'Analysis',
    path: '/analysis',
    icon: <MdTimeline />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: 
    [
      {
        title: 'Analysis2',
        path: '/analysis/analysis2',
        icon: <MdTimeline />
      }
    ]
  },


  {
    title: 'Sandbox',
    path: '/sandbox',
    icon: <FaBiohazard />
  }
];