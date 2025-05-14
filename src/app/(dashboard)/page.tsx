import { CourseGrid } from "@/components/common";
import CourseItem from "@/components/course/CourseItem";
import Heading from "@/components/common/Heading";
import { getAllCourse } from "@/lib/actions/course.actions";
import React from "react";
import { ECourseStatus } from "@/types/enums";

const page = async ({}) => {
  const courses = (await getAllCourse({status:ECourseStatus.APPROVED})) || [];
  return (
    <div>
      <Heading> Khám phá</Heading>
      <CourseGrid>
        {courses.length > 0 &&
          courses?.map((item) => <CourseItem key={item.slug} data={item}></CourseItem>)}
      </CourseGrid>
    </div>
  );
};

export default page;
