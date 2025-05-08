import Heading from "@/components/common/Heading";
import UpdateCoursePage from "@/pages_course/update-course-container";
import React from "react";

type SearchParams = Promise<{ [key: string]: string | string }>;

const page = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  const slug = searchParams.slug;
  return (
    <>
      <Heading className="mb-8">Update Course</Heading>
      <UpdateCoursePage params={Promise.resolve({ slug })} />
    </>
  );
};

export default page;
