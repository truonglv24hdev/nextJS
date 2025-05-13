"use server";

import User from "@/database/user.model";
import { IUser } from "@/database/user.model";
import { connectDatabase } from "../mongoose";
import { ECourseStatus, TCreateUserParams } from "@/types/enums";
import { auth } from "@clerk/nextjs/server";
import Course, { ICourse } from "@/database/course.model";

export async function createUser(params: TCreateUserParams) {
  try {
    await connectDatabase();
    const newUser: TCreateUserParams = await User.create(params);
    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserInfo({
  userId,
}: {
  userId: string;
}): Promise<IUser | null | undefined> {
  try {
    await connectDatabase();
    const findUser = await User.findOne({ clerkId: userId });
    if (!findUser) return null;
    return findUser;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserCourses(): Promise<ICourse[] | undefined | null> {
  try {
    await connectDatabase();
    const { userId } = await auth();
    const findUser = await User.findOne({ clerkId: userId }).populate({
      path: "courses",
      model: Course,
      match: {
        status: ECourseStatus.APPROVED,
      },
    });
    if (!findUser) return [];
    return findUser.courses;
  } catch (error) {
    console.log(error);
  }
}
