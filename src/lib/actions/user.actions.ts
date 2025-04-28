"use server";

import User from "@/database/user.model";
import { connectDatabase } from "../mongoose";
import { TCreateUserParams } from "@/types/enums";

export default async function createUser(params: TCreateUserParams) {
  try {
    await connectDatabase();
    const newUser: TCreateUserParams = await User.create(params);
    return newUser;
  } catch (error) {
    console.log(error);
  }
}
