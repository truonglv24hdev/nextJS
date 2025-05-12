"use client";
import React from "react";
import { IconPlay } from "../icon";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui";
import { createHistory } from "@/lib/actions/history.action";

const LessonItem = ({
  lesson,
  url,
  isActive = false,
  isChecked = false,
}: {
  lesson: { title: string; duration: number; course: string; _id: string };
  url?: string;
  isActive?: boolean;
  isChecked?: boolean;
}) => {
  const handleCompleteLesson = async (checked: boolean | string) => {
    try {
      await createHistory({
        course: lesson.course,
        lesson: lesson._id,
        checked,
        path: url || "/",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-3 border rounded-lg p-2 text-base font-medium",
          isActive ? "text-blue-600 font-semibold " : ""
        )}
      >
        {url && (
          <Checkbox
            className="flex-shrink-0 inline-block size-5"
            defaultChecked={isChecked}
            onCheckedChange={(checked) => handleCompleteLesson(checked)}
          />
        )}

        <IconPlay className="size-5" />
        {url ? (
          <Link
            href={url}
            className={cn("line-clamp-1", isActive && "pointer-events-none")}
          >
            {lesson.title}
          </Link>
        ) : (
          <h4>{lesson.title}</h4>
        )}

        <span className="ml-auto text-xs font-semibold">
          {lesson.duration} phut
        </span>
      </div>
    </div>
  );
};

export default LessonItem;
