import Heading from "@/components/common/Heading";
import CourseUpdateContent from "@/components/course/CourseUpdateContent";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import React from "react";

type PageProps = {
  searchParams: Promise<{ slug?: string | string[] }>;
};

const page = async ({ searchParams }: PageProps) => {
  const resolvedSearchParams = await searchParams;
  const slugParam = resolvedSearchParams.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

  if (!slug) {
    return <div>Thiếu slug của khoá học</div>;
  }

  const findCourse = await getCourseBySlug({ slug });

  if (!findCourse) return <div>Không tìm thấy khóa học</div>;

  return (
    <div>
      <Heading className="mb-10">
        Nội dung: <strong className="text-red-500">{findCourse.title}</strong>
      </Heading>
      <CourseUpdateContent course={JSON.parse(JSON.stringify(findCourse))} />
    </div>
  );
};

export default page;
