"use server";

import { TCreateLecture, TUpdateLecture } from "@/types/enums";
import { connectDatabase } from "../mongoose";
import Course from "@/database/course.model";
import Lecture from "@/database/lecture.model";
import { revalidatePath } from "next/cache";

export async function createLecture(params: TCreateLecture) {
  try {
    await connectDatabase();
    const findCourse = await Course.findById(params.course);
    if (!findCourse) return;
    const newLecture = await Lecture.create(params);
    findCourse.lectures.push(newLecture._id);
    findCourse.save();
    revalidatePath(params.path!);
    return {
      success: true,
    };
  } catch (error) {}
}

export async function updateLecture(params: TUpdateLecture) {
  try {
    await connectDatabase();

    await Lecture.findByIdAndUpdate(params.lectureId, params.updateData, {
      new: true,
    });
    revalidatePath(params.updateData.path!);

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
  }
}
