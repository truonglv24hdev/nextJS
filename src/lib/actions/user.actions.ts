"use server";

import User from "@/database/user.model";
import { IUser } from "@/database/user.model";
import { connectDatabase } from "../mongoose";
import {
  ECourseStatus,
  EUserStatus,
  TCreateUserParams,
  TGetAllParams,
} from "@/types/enums";
import { auth } from "@clerk/nextjs/server";
import Course, { ICourse } from "@/database/course.model";
import { revalidatePath } from "next/cache";
import { FilterQuery } from "mongoose";

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

export async function getAllUser(
  params: TGetAllParams
): Promise<IUser[] | undefined> {
  try {
    await connectDatabase();
    const { page = 1, limit = 10, search, status } = params;
    const skip = (page - 1) * limit;
    const query: FilterQuery<typeof User> = {};
    if (search) {
      query.$or = [{ username: { $regex: search, $options: "i" } }];
    }

    if (status) {
      query.status = status || EUserStatus.ACTIVE;
    }

    const users = await User.find(query).skip(skip).limit(limit).sort({
      createdAt: -1,
    });
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser({
  email,
  status,
  path,
}: {
  email: string;
  status: EUserStatus;
  path: string;
}) {
  try {
    await connectDatabase();
    const findUser = await User.findOne({ email: email });

    if (!findUser) return;
    await User.findOneAndUpdate(
      { email: email },
      { status: status },
      {
        new: true,
      }
    );
    revalidatePath(path || "/");

    return {
      success: true,
      message: "Cập nhật khóa học thành công!",
    };
  } catch (error) {
    console.log(error);
  }
}
