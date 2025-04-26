"use client";
import { ActiveLinkProps } from "@/app/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ActiveLink = ({ url, children }: ActiveLinkProps) => {
  const pathName = usePathname();
  const isActive = url === pathName;
  return (
    <Link
      href={url}
      className={`p-3 rounded-md flex items-center gap-3 hover:bg-opacity-10 hover:text-red-600 transition-all ${
        isActive
          ? "text-white bg-red-500"
          : "hover:text-black hover:bg-blue-500"
      }`}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
