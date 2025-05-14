"use server";

import { auth } from "@clerk/nextjs/server";
import { connectDatabase } from "../mongoose";
import User from "@/database/user.model";
import History, { IHistory } from "@/database/history.model";
import { TCreateHistory } from "@/types/enums";
import { revalidatePath } from "next/cache";

export async function createHistory(params: TCreateHistory) {
  try {
    await connectDatabase();
    const { userId } = await auth();
    const findUser = await User.findOne({ clerkId: userId });
    if (!findUser) return;
    if (params.checked) {
      await History.create({
        course: params.course,
        lesson: params.lesson,
        user: findUser._id,
      });
    } else {
      await History.findOneAndDelete({
        course: params.course,
        lesson: params.lesson,
        user: findUser._id,
      });
    }
    revalidatePath(params.path || "/");
  } catch (error) {
    console.log(error);
  }
}

export async function getHistory(params: {
  course: string;
}): Promise<IHistory[] | undefined> {
  try {
    await connectDatabase();
    const { userId } = await auth();
    const findUser = await User.findOne({ clerkId: userId });
    if (!findUser) return;
    const histories = await History.find({
      course: params.course,
      user: findUser._id,
    });
    return JSON.parse(JSON.stringify(histories));
  } catch (error) {
    console.log(error);
  }
}
