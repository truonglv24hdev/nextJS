"use server";

import {
  TCourseUpdateParams,
  TCreateCourseParams,
  TUpdateCourseParams,
} from "@/types/enums";
import { connectDatabase } from "../mongoose";
import Course, { ICourse } from "@/database/course.model";
import { revalidatePath } from "next/cache";
import Lecture from "@/database/lecture.model";
import Lesson from "@/database/lesson.model";

export async function getAllCourse(): Promise<ICourse[] | undefined> {
  try {
    await connectDatabase();

    const courses = await Course.find();
    return courses;
  } catch (error) {
    console.log(error);
  }
}

export async function getCourseBySlug({
  slug,
}: {
  slug: string;
}): Promise<TCourseUpdateParams | undefined> {
  try {
    await connectDatabase();

    const findCourse = await Course.findOne({ slug }).populate({
      path: "lectures",
      model: Lecture,
      select: "_id title",
      match: {
        _destroy: false,
      },
      populate: {
        path: "lesson",
        model: Lesson,
        match: {
          _destroy: false,
        },
      },
    });
    return JSON.parse(JSON.stringify(findCourse));
  } catch (error) {
    console.log(error);
  }
}

export async function getLectureBySlug({
  slug,
}: {
  slug: string;
}): Promise<TCourseUpdateParams | undefined> {
  try {
    await connectDatabase();

    const findCourse = await Course.findOne({ slug }).populate({
      path: "lectures",
      select: "title _id",
      match: { _destroy: false },
    });
    return findCourse;
  } catch (error) {
    console.log(error);
  }
}

export async function createCourse(params: TCreateCourseParams) {
  try {
    await connectDatabase();

    const course = await Course.create(params);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(course)),
    };
  } catch (error) {
    console.log(error);
  }
}

export async function updateCourse(params: TUpdateCourseParams) {
  console.log("updateCourse ~ params:", params);
  try {
    await connectDatabase();
    const findCourse = await Course.findOne({ slug: params.slug });

    if (!findCourse) return;
    await Course.findOneAndUpdate({ slug: params.slug }, params.updateData, {
      new: true,
    });
    revalidatePath(params.path || "/");

    return {
      success: true,
      message: "Cập nhật khóa học thành công!",
    };
  } catch (error) {
    console.log(error);
  }
}
