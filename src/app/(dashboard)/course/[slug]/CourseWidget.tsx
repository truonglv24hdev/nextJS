"use client";
import { IconPlay, IconStudy, IconUser } from "@/components/icon";
import React from "react";
import ButtonBuyCourse from "./ButtonBuyCourse";
import Link from "next/link";
import { Button } from "@/components/ui";

const CourseWidget = ({
  data,
  findUser,
  userCourse,
}: {
  data: any;
  findUser: any;
  userCourse?: string[] | undefined;
}) => {
  return (
    <div>
      <div className="bg-gray-500 rounded-lg p-5">
        <div className="flex items-center gap-2 mb-3">
          <strong className="text-green-500 text-xl font-bold">
            {data.price || "N/A"}
          </strong>
          <span className="text-red-500 line-through text-sm">
            {data.sale_price || "N/A"}
          </span>
          <span className="ml-auto inline-block px-3 py-1 rounded-lg bg-green-500/10 font-semibold text-sm">
            {data.price && data.sale_price
              ? Math.floor((data.price / data.sale_price) * 100) + "%"
              : "No Discount"}
          </span>
        </div>
        <h3 className="font-bold mb-3 text-xl">Khoa hoc bao gom co</h3>
        <ul className="mb-5 flex flex-col gap-3 text-sm">
          <li className="flex items-center gap-2">
            <IconPlay className="size-4" />
            <span>30h hoc</span>
          </li>
          <li className="flex items-center gap-2">
            <IconPlay className="size-4" />
            <span>Video Full HD</span>
          </li>
          <li className="flex items-center gap-2">
            <IconUser className="size-4" />
            <span>Co nhom ho tro</span>
          </li>
          <li className="flex items-center gap-2">
            <IconStudy className="size-4" />
            <span>Tai Lieu Kem Theo</span>
          </li>
        </ul>
        <div>
          {userCourse ? (
            <Link href={`/study`}>
              <Button className="w-full">Học khóa học</Button>
            </Link>
          ) : (
            <ButtonBuyCourse
              user={JSON.parse(JSON.stringify(findUser))}
              courseId={JSON.parse(JSON.stringify(data._id))}
              amount={data.price}
            ></ButtonBuyCourse>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseWidget;
