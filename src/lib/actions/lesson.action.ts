"use server";

import { TCreateLesson, TUpdateLecture, TUpdateLesson } from "@/types/enums";
import { connectDatabase } from "../mongoose";
import Course from "@/database/course.model";
import Lecture from "@/database/lecture.model";
import { revalidatePath } from "next/cache";
import Lesson, { ILesson } from "@/database/lesson.model";

export async function createLesson(params: TCreateLesson) {
  try {
    console.log(params);
    await connectDatabase();
    const findCourse = await Course.findById(params.course);
    if (!findCourse) return;
    const findLecture = await Lecture.findById(params.lecture);
    if (!findLecture) return;
    const newLesson = await Lesson.create(params);
    findLecture.lesson.push(newLesson._id);
    findLecture.save();
    revalidatePath(params.path || "/");
    if (!newLesson) return;
    return {
      success: true,
    };
  } catch (error) {}
}

export async function updateLesson(params: TUpdateLesson) {
  try {
    await connectDatabase();

    await Lesson.findByIdAndUpdate(params.lessonId, params.updateData, {
      new: true,
    });
    revalidatePath(params.updateData.path || "");
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getLessonBySlug({
  slug,
  course,
}: {
  slug: string;
  course: string;
}): Promise<ILesson | undefined> {
  try {
    await connectDatabase();

    const lesson = await Lesson.findOne({ slug: slug, course: course });

    return JSON.parse(JSON.stringify(lesson));
  } catch (error) {
    console.log(error);
  }
}

export async function findAllLesson({
  course,
}: {
  course: string;
}): Promise<ILesson[] | undefined> {
  try {
    await connectDatabase();

    const lessons = await Lesson.find({ course: course });

    return JSON.parse(JSON.stringify(lessons));
  } catch (error) {
    console.log(error);
  }
}
