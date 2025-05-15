"use server";
import {
  ECourseStatus,
  TCourseUpdateParams,
  TCreateCourseParams,
  TGetAllParams,
  TUpdateCourseParams,
} from "@/types/enums";
import { connectDatabase } from "../mongoose";
import Course, { ICourse } from "@/database/course.model";
import { revalidatePath } from "next/cache";
import Lecture from "@/database/lecture.model";
import Lesson from "@/database/lesson.model";
import { FilterQuery } from "mongoose";

export async function getAllCourse(
  params: TGetAllParams
): Promise<ICourse[] | undefined> {
  try {
    await connectDatabase();
    const { page = 1, limit = 10, search, status } = params;
    const skip = (page - 1) * limit;
    const query: FilterQuery<typeof Course> = {};
    if (search) {
      query.$or = [{ title: { $regex: search, $options: "i" } }];
    }

    if (status) {
      query.status = status || ECourseStatus.APPROVED;
    }

    const courses = await Course.find(query).skip(skip).limit(limit).sort({
      createdAt: -1,
    });
    return JSON.parse(JSON.stringify(courses));
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
