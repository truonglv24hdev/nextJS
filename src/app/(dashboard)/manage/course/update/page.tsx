import Heading from "@/components/common/Heading";
import UpdateCoursePage from "@/pages/update-course-container";
import React from "react";

const page = async ({ searchParams }: { searchParams: { slug: string } }) => {

  return (
    <>
      <Heading className="mb-8">Update Course</Heading>
      <UpdateCoursePage slug={searchParams.slug} />
    </>
  );
};

export default page;