import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IconEye, IconStar } from "@/components/icon";
import IconClock from "../icon/IconClock";

const courseInfo = [
  {
    title: "3000",
    icon: <IconEye className="size-4"></IconEye>,
  },
  { title: "5.0", icon: <IconStar className="size-4"></IconStar> },
  { title: "30h25p", icon: <IconClock className="size-4"></IconClock> },
];

const CourseItem = () => {
  return (
    <div className="bg-white border border-gray-200 p-5 rounded-2xl">
      <Link href="#" className="block h-[180px] relative">
        <Image
          src="https://images.unsplash.com/photo-1745500415839-503883982264?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8"
          alt=""
          width={300}
          height={200}
          className="w-full h-full object-cover rounded-lg"
          sizes="@media (min-width:640px) 300px, 100vw"
          priority
        />
        <span className="inline-block px-3 py-1 rounded-full absolute top-3 right-3 z-10 text-white font-medium bg-green-500 text-xs">
          New
        </span>
      </Link>
      <div className="pt-4">
        <h3 className="font-bold text-lg mb-3">
          Khóa học NextJS - Xây dựng Education
        </h3>
        <div className="flex items-center gap-3 m-5 text-xs text-gray-500">
          {courseInfo.map((item, index) => (
            <div className="flex items-center gap-2" key={index}>
              {item.icon}
              <span>{item.title}</span>
            </div>
          ))}
          <span className="font-bold text-blue-600 ml-auto text-base">
            800.000
          </span>
        </div>
        <Link
          href="#"
          className="flex items-center justify-center w-full mt-10 rounded-lg text-white font-semibold bg-red-300 h-12"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
};

export default CourseItem;
