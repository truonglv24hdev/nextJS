import React from "react";
import { IconPlay } from "../icon";
import Link from "next/link";

const LessonItem = ({
  lesson,
  url,
}: {
  lesson: { title: string; duration: number };
  url?: string;
}) => {
  return (
    <div>
      <div className="flex items-center gap-3 border rounded-lg p-2 text-base font-medium">
        <IconPlay className="size-5" />
        {url ? <Link href={"/"}>{lesson.title}</Link> : <h4>{lesson.title}</h4>}

        <span className="ml-auto text-xs font-semibold">
          {lesson.duration} phut
        </span>
      </div>
    </div>
  );
};

export default LessonItem;
