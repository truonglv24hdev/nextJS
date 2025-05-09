"use client";
import { IconArrowLeft, IconArrowRight } from "@/components/icon";
import { Button } from "@/components/ui";
import { ILesson } from "@/database/lesson.model";
import { useRouter } from "next/navigation";
import React from "react";

const LessonNavigation = ({
  nextLesson,
  prevLesson,
  course,
}: {
  nextLesson: ILesson | undefined;
  prevLesson: ILesson | undefined;
  course: string;
}) => {
  const router = useRouter();

  return (
    <div className="flex gap-3">
      <Button
        className="size-10 p-3"
        onClick={() =>
          router.push(`/${course}/lesson?slug=${prevLesson?.slug}`)
        }
        disabled={!prevLesson}
      >
        <IconArrowLeft />
      </Button>
      <Button
        className="size-10 p-3"
        onClick={() =>
          router.push(`/${course}/lesson?slug=${nextLesson?.slug}`)
        }
        disabled={!nextLesson}
      >
        <IconArrowRight />
      </Button>
    </div>
  );
};

export default LessonNavigation;
