import CourseManage from "@/components/course/CourseManage";
import { getAllCourse } from "@/lib/actions/course.actions";
import { ECourseStatus } from "@/types/enums";
import React from "react";

type PageProps = {
  searchParams: Promise<{
    page: number;
    limit: number;
    search?: string;
    status?: ECourseStatus;
  }>;
};

const page = async ({ searchParams }: PageProps) => {
  const resolvedSearchParams = await searchParams;
  const courses = await getAllCourse({
    page: resolvedSearchParams.page || 1,
    limit: 10,
    search: resolvedSearchParams.search,
    status: resolvedSearchParams.status,
  });
  return (
    <CourseManage
      courses={courses ? JSON.parse(JSON.stringify(courses)) : []}
    ></CourseManage>
  );
};

export default page;
