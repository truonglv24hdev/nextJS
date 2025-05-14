import PageNotFound from "@/app/not-found";
import { IconCheck } from "@/components/icon";
import { courseLevelTitle } from "@/constants/course-constant";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import { ECourseStatus, TUpdateCourseLecture } from "@/types/enums";
import Image from "next/image";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LessonItem from "@/components/lesson/LessonItem";
import { auth } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/user.actions";
import CourseWidget from "./CourseWidget";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const data = await getCourseBySlug({ slug: slug }).catch(() => null);
  if (!data || data.status !== ECourseStatus.APPROVED) return <PageNotFound />;
  const { userId } = await auth();
  const findUser = await getUserInfo({ userId: userId || "" });
  const userCourse = findUser?.courses.map((c) => c.toString());
  const lectures = data.lectures || [];
  const videoId =
    data.intro_url && data.intro_url.includes("v=")
      ? data.intro_url.split("v=")[1]
      : null;

  console.log(data);

  return (
    <div className="grid lg:grid-cols-[2fr_1fr] gap-10 min-h-screen">
      <div>
        <div className="relative aspect-video mb-5">
          {data.intro_url ? (
            <iframe
              width="916"
              height="515"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="Course Intro Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            />
          ) : (
            data.img && (
              <Image
                src={data.img}
                alt={data.title || "Course image"}
                fill
                className="w-full h-full object-cover rounded-lg"
                loading="lazy"
              />
            )
          )}
        </div>
        <h1 className="font-bold text-3xl mb-5">{data.title}</h1>
        <BoxSection title="Mo ta">
          <div className="leading-normal">{data.des}</div>
        </BoxSection>
        <BoxSection title="Thong tin">
          <div className="grid grid-cols-4 gap-5">
            <BoxInfo title="Bai hoc">100</BoxInfo>
            <BoxInfo title="Luot xem">{data.view}</BoxInfo>
            <BoxInfo title="Trinh do">{courseLevelTitle[data.level]}</BoxInfo>
            <BoxInfo title="Thoi gian hoc">100h45p</BoxInfo>
          </div>
        </BoxSection>
        <BoxSection title="Noi dung khoa hoc">
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
                            lesson={{ ...item, course: item.course.toString() }}
                            key={item._id}
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
        </BoxSection>
        <BoxSection title="Yeu cau">
          {data.info?.requirement?.length ? (
            data.info.requirement.map((r, index) => (
              <div key={index} className="mb-3 flex items-center gap-2">
                <span className="flex-shrink-0 size-5 bg-red-400 text-white p-1 rounded flex items-center justify-center">
                  <IconCheck />
                </span>
                <span>{r}</span>
              </div>
            ))
          ) : (
            <p>No requirements available</p>
          )}
        </BoxSection>
        <BoxSection title="Loi ich">
          {data.info?.benefit?.length ? (
            data.info.benefit.map((b, index) => (
              <div key={index} className="mb-3 flex items-center gap-2">
                <span className="flex-shrink-0 size-5 bg-red-400 text-white p-1 rounded flex items-center justify-center">
                  <IconCheck />
                </span>
                <span>{b}</span>
              </div>
            ))
          ) : (
            <p>No benefits available</p>
          )}
        </BoxSection>
        <BoxSection title="Q.A">
          {data.info?.qa?.map((qa, index) => (
            <Accordion type="single" collapsible key={index}>
              <AccordionItem value={qa.question}>
                <AccordionTrigger>{qa.question}</AccordionTrigger>
                <AccordionContent>{qa.answer}</AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </BoxSection>
      </div>
      <div>
        <CourseWidget
          findUser={JSON.parse(JSON.stringify(findUser))}
          data={JSON.parse(JSON.stringify(data))}
          userCourse={userCourse}
        ></CourseWidget>
      </div>
    </div>
  );
};

function BoxInfo({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-500 rounded-lg p-5 mb-10">
      <h4 className="text-sm text-slate-400 font-normal">{title}</h4>
      <h3 className="font-bold">{children}</h3>
    </div>
  );
}

function BoxSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <h2 className="font-bold text-xl mb-5">{title}</h2>
      <div className="mb-10">{children}</div>
    </>
  );
}

export default page;
