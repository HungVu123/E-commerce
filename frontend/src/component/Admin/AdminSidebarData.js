import React from "react";
import { GrHome, GrShop, GrUserExpert, GrValidate } from "react-icons/gr";
export const AdminSidebarData = [
  {
    title: "Dashboard",
    path: "/admin/profile",
    icon: <GrHome style={{ marginRight: "5px" }} />,
  },
  {
    title: "Products",
    path: "/admin/products",
    icon: <GrShop style={{ marginRight: "5px" }} />,
  },
  {
    title: "Orders",
    path: "/admin/orders",
    icon: <GrValidate style={{ marginRight: "5px" }} />,
  },
  {
    title: "Users",
    path: "/admin/users",
    icon: <GrUserExpert style={{ marginRight: "5px" }} />,
  },
];
