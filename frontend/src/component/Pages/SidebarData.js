import React from 'react'
import { GrLocation, GrHome, GrLock ,GrShop } from "react-icons/gr";

export const SidebarData=[
    {
        title: "Profile",
        path: "/user/profile",
        icon: <GrHome style={{ marginRight: "5px" }} />,
      },
      {
        title: "Orders",
        path: "/user/orders",
        icon: <GrShop style={{ marginRight: "5px" }} />,
      },
      {
        title: "Change Password",
        path: "/user/changePassword",
        icon: <GrLock style={{ marginRight: "5px" }} />,
      },
      {
        title: "Address",
        path: "/user/address",
        icon:<GrLocation style={{ marginRight: "5px" }} />,
      },
]
