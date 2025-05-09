import PageNotFound from "@/app/not-found";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import { findAllLesson, getLessonBySlug } from "@/lib/actions/lesson.action";
import React from "react";
import LessonNavigation from "./LessonNavigation";
import { TUpdateCourseLecture } from "@/types/enums";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui";
import LessonItem from "@/components/lesson/LessonItem";

type PageProps = {
  params: Promise<{ course: string }>;
  searchParams: Promise<{ slug?: string | string[] }>;
};

const page = async ({ params, searchParams }: PageProps) => {
  const { course } = await params;
  const resolvedSearchParams = await searchParams;
  const slugParam = resolvedSearchParams.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam || "";

  const findCourse = await getCourseBySlug({ slug: course });

  if (!findCourse) return null;

  const courseId = findCourse._id.toString();
  const lectures = findCourse.lectures;

  const lessonDetail = await getLessonBySlug({
    slug,
    course: courseId || "",
  });

  const lessonsList = await findAllLesson({ course: courseId || "" });

  if (!lessonDetail) return null;
  const currentLesson =
    lessonsList?.findIndex((el) => el.slug === lessonDetail.slug) || 0;

  const nextLesson = lessonsList?.[currentLesson + 1];
  const prevLesson = lessonsList?.[currentLesson - 1];

  const videoId = lessonDetail.video_url?.split("v=").at(-1);

  if (!course || !slug) return <PageNotFound />;

  return (
    <div className="grid grid-cols-[2fr_1fr] gap-10 min-h-screen">
      <div>
        <div className="relative mb-5 aspect-video">
          <iframe
            className="w-full h-full object-fill"
            src={`https://www.youtube.com/embed/${videoId}`}
          ></iframe>
        </div>
        <div className="flex items-center justify-between">
          <LessonNavigation
            nextLesson={nextLesson}
            prevLesson={prevLesson}
            course={course}
          ></LessonNavigation>
          <div></div>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-5">
          {lectures.length ? (
            lectures.map((lecture: TUpdateCourseLecture) => (
              <Accordion key={lecture._id} type="single" collapsible>
                <AccordionItem value={lecture._id.toString()}>
                  <AccordionTrigger>
                    <div className="flex items-center gap-3 justify-between w-full pr-5">
                      <div>{lecture.title}</div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="!bg-transparent border-none p-0">
                    <div className="flex flex-col gap-3">
                      {lecture.lesson.map((item) => (
                        <LessonItem
                          lesson={item}
                          key={item._id}
                          url={`/${course}/lesson?slug=${item?.slug}`}
                        ></LessonItem>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))
          ) : (
            <p>No lectures available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
