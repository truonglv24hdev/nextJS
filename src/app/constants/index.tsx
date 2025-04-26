import { IconPlay, IconExplore } from "@/components/icon";
import React from "react";
import { MenuItems } from "../types";

export const menuItems: MenuItems[] = [
  {
    url: "/",
    title: "Khu vuc hoc tap",
    icon: <IconPlay className="size-5" />,
  },
  {
    url: "/explore",
    title: "Khu vuc kham pha",
    icon: <IconExplore className="size-5" />,
  },
];
