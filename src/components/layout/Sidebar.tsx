"use client";
import Link from "next/link";
import React from "react";
import { menuItems } from "@/app/constants";
import ActiveLink from "../common/ActiveLink";
import { MenuItems } from "@/app/types";
import { useAuth, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../common/ModeToggle";
import { IconUser } from "../icon";

const Sidebar = () => {
  const { userId } = useAuth();
  return (
    <div className="p-5 border-r border-r-gray-200 bg-white lg:flex flex-col fixed top-0 left-0 bottom-0 w-[300px] ">
      <Link href="/" className="font-bold text-3xl inline-block mb-5">
        Education
      </Link>
      <ul className="flex flex-col gap-2">
        {menuItems.map((menu) => (
          <MenuItem
            key={menu.url}
            url={menu.url}
            title={menu.title}
            icon={menu.icon}
          ></MenuItem>
        ))}
      </ul>
      <div className="mt-auto flex items-center justify-end gap-5">
        <ModeToggle></ModeToggle>
        {!userId ? (
          <Link
            href="/sign-in"
            className="size-10 rounded-lg bg-primary text-white flex items-center justify-center p-1"
          >
            <IconUser />
          </Link>
        ) : (
          <UserButton />
        )}
      </div>
    </div>
  );
};

function MenuItem({ url = "/", title = "", icon }: MenuItems) {
  return (
    <li>
      <ActiveLink url={url}>
        {icon}
        {title}
      </ActiveLink>
    </li>
  );
}

export default Sidebar;
