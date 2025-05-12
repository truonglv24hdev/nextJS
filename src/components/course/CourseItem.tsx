import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IconEye, IconStar } from "@/components/icon";
import IconClock from "../icon/IconClock";
import { ICourse } from "@/database/course.model";

const CourseItem = ({
  data,
  cta,
  url = "",
}: {
  data: ICourse;
  cta?: string;
  url?: string;
}) => {
  const courseInfo = [
    {
      title: data?.view ?? "0",
      icon: <IconEye className="size-4"></IconEye>,
    },
    {
      title: data?.rating ?? "5",
      icon: <IconStar className="size-4"></IconStar>,
    },
    { title: "30h25p", icon: <IconClock className="size-4"></IconClock> },
  ];

  const courseUrl = url ? url : `/course/${data.slug}`;

  return (
    <div className="bg-white border border-gray-200 p-5 rounded-2xl flex flex-col">
      <Link href={courseUrl} className="block h-[180px] relative">
        <Image
          src={data.img}
          alt={data.title}
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
      <div className="pt-4 flex flex-col flex-1">
        <h3 className="font-bold text-lg mb-3 ">{data.title}</h3>
        <div className="mt-auto">
          <div className="flex items-center gap-3 m-5 text-xs text-gray-500">
            {courseInfo.map((item, index) => (
              <div className="flex items-center gap-2" key={index}>
                {item.icon}
                <span>{item.title}</span>
              </div>
            ))}
            <span className="font-bold text-blue-600 ml-auto text-base">
              {data.price}
            </span>
          </div>
          <Link
            href={courseUrl}
            className="flex items-center justify-center w-full mt-10 rounded-lg text-white font-semibold bg-red-300 h-12"
          >
            {cta || "Xem chi tiet"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
