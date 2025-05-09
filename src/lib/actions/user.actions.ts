"use server";

import User from "@/database/user.model";
import { IUser } from "@/database/user.model";
import { connectDatabase } from "../mongoose";
import { TCreateUserParams } from "@/types/enums";

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
