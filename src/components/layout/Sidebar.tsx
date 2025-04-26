import Link from "next/link";
import React from "react";
import { menuItems } from "@/app/constants";
import ActiveLink from "../common/ActiveLink";
import { MenuItems } from "@/app/types";

const Sidebar = () => {
  return (
    <div className="p-5 border-r border-r-gray-200">
      <Link href="/" className="font-bold text-3xl inline-block mb-5">
        24hDev
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
