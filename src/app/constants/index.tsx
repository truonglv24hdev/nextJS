import {
  IconPlay,
  IconExplore,
  IconStudy,
  IconUser,
  IconComment,
  IconOrder,
} from "@/components/icon";
import React from "react";
import { MenuItems } from "../types";

export const menuItems: MenuItems[] = [
  {
    url: "/",
    title: "Khám phá",
    icon: <IconPlay className="size-5" />,
  },
  {
    url: "/study",
    title: "Khu vuc học tập",
    icon: <IconStudy className="size-5" />,
  },
  {
    url: "/manage/course",
    title: "Quản lí khóa học",
    icon: <IconExplore className="size-5" />,
  },
  {
    url: "/manage/member",
    title: "Quản lí thành viên",
    icon: <IconUser className="size-5" />,
  },
  {
    url: "/manage/comment",
    title: "Quản lí bình luận",
    icon: <IconComment className="size-5" />,
  },
  {
    url: "/manage/order",
    title: "Quản lí đơn hàng",
    icon: <IconOrder className="size-5" />,
  },
];
