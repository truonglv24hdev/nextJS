"use client";
import { CourseGrid } from "@/components/common";
import CourseItem from "@/components/course/CourseItem";
import { ICourse } from "@/database/course.model";
import React from "react";

const StudyCourse = ({
  courses,
}: {
  courses: ICourse[] | null | undefined;
}) => {
  if (!courses) return null;
  const lastLesson =
    JSON.parse(localStorage.getItem("lastLesson") || "[]") || [];
  return (
    <div>
      <CourseGrid>
        {courses &&
          courses.length > 0 &&
          courses.map((item) => {
            const url =
              lastLesson.find((el: any) => el.course === item.slug)?.lesson ||
              "/";
            return (
              <CourseItem
                key={item.slug}
                data={item}
                cta="Tiep tuc hoc"
                url={url}
              ></CourseItem>
            );
          })}
      </CourseGrid>
    </div>
  );
};

export default StudyCourse;
