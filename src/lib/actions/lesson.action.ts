"use server";

import { TCreateLesson, TUpdateLecture } from "@/types/enums";
import { connectDatabase } from "../mongoose";
import Course from "@/database/course.model";
import Lecture from "@/database/lecture.model";
import { revalidatePath } from "next/cache";
import Lesson from "@/database/lesson.model";

export async function createLesson(params: TCreateLesson) {
  try {
    console.log(params)
    await connectDatabase();
    const findCourse = await Course.findById(params.course);
    if (!findCourse) return;
    const findLecture = await Lecture.findById(params.lecture);
    if (!findLecture) return;
    const newLesson = await Lesson.create(params);
    findLecture.lesson.push(newLesson._id)
    findLecture.save()
    revalidatePath(params.path || "/");
    if (!newLesson) return;
    return {
      success: true,
    };
  } catch (error) {}
}
