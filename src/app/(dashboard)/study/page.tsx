import Heading from "@/components/common/Heading";
import { getUserCourses } from "@/lib/actions/user.actions";
import React from "react";
import StudyCourse from "./StudyCourse";

export const dynamic = "force-dynamic";

const page = async () => {
  const courses = await getUserCourses();
  return (
    <>
      <Heading>Khu vuc hoc tap</Heading>
      <StudyCourse
        courses={courses ? JSON.parse(JSON.stringify(courses)) : []}
      ></StudyCourse>
    </>
  );
};

export default page;
