import PageNotFound from "@/app/not-found";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import { findAllLesson, getLessonBySlug } from "@/lib/actions/lesson.action";
import React from "react";
import LessonNavigation from "./LessonNavigation";
import { EUserRole, TUpdateCourseLecture } from "@/types/enums";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui";
import LessonItem from "@/components/lesson/LessonItem";
import Heading from "@/components/common/Heading";
import { getHistory } from "@/lib/actions/history.action";
import { auth } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/user.actions";
import LessonSaveUrl from "@/components/lesson/LessonSaveUrl";

type PageProps = {
  params: Promise<{ course: string }>;
  searchParams: Promise<{ slug?: string | string[] }>;
};

const page = async ({ params, searchParams }: PageProps) => {
  const { userId } = await auth();
  if (!userId) return <PageNotFound />;
  const findUser = await getUserInfo({ userId });
  if (!findUser) return <PageNotFound />;
  const { course } = await params;
  const resolvedSearchParams = await searchParams;
  const slugParam = resolvedSearchParams.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam || "";

  const findCourse = await getCourseBySlug({ slug: course });

  if (!findCourse) return null;

  const courseId = findCourse._id.toString();
  const lectures = findCourse.lectures;

  if (!findUser.courses.includes(courseId as any) && findUser.role !== EUserRole.USER) return <PageNotFound />;

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

  const histories = await getHistory({ course: findCourse._id });
  const completePercentage =
    ((histories?.length || 0) / (lessonsList?.length || 1)) * 100;

  return (
    <div className="grid grid-cols-[2fr_1fr] gap-10 min-h-screen items-start">
      <LessonSaveUrl url={`/${course}/lesson?slug=${slug}`} course={course}></LessonSaveUrl>
      <div> 
        <div className="relative mb-5 aspect-video">
          <iframe
            className="w-full h-full object-fill"
            src={`https://www.youtube.com/embed/${videoId}`}
          ></iframe>
        </div>
        <div className="flex items-center justify-between mb-5">
          <LessonNavigation
            nextLesson={nextLesson}
            prevLesson={prevLesson}
            course={course}
          ></LessonNavigation>
          <div></div>
        </div>
        <Heading className="mb-10">{lessonDetail.title}</Heading>
        <div className="p-5 rounded-lg border">
          <div
            dangerouslySetInnerHTML={{ __html: lessonDetail.content || "" }}
          ></div>
        </div>
      </div>
      <div className="sticky top-5 right-0 max-h-[calc(100svh-100px)] overflow-y-auto">
        <div className="h-3 w-full rounded-full border mb-2">
          <div
            className="w-0 h-full rounded-full bg-green-600 transition-all duration-300"
            style={{ width: `${completePercentage}%` }}
          ></div>
        </div>
        <div className="flex flex-col gap-5 ">
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
                          lesson={{ ...item, course: item.course.toString() }}
                          key={item._id}
                          url={`/${course}/lesson?slug=${item?.slug}`}
                          isActive={item.slug === slug}
                          isChecked={histories?.some(
                            (el) => el.lesson.toString() === item._id.toString()
                          )}
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
