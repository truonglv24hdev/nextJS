"use client";
import React, { useEffect } from "react";

const LessonSaveUrl = ({ url, course }: { url: string; course: string }) => {
  useEffect(() => {
    let result: any =
      JSON.parse(localStorage.getItem("lastLesson") || "[]") || [];
    const item = {
      course,
      lesson: url,
    };
    result = result.filter((el: any) => el.course !== course);
    result.push(item);
    localStorage.setItem("lastLesson", JSON.stringify(result));
  }, [url, course]);
  return null;
};

export default LessonSaveUrl;
