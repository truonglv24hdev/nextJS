"use server";
import { TCreateOrderParams } from "@/types/enums";
import { connectDatabase } from "../mongoose";
import Order from "@/database/order.model";
import Course from "@/database/course.model";
import User from "@/database/user.model";

export async function createOrderCourse(params: TCreateOrderParams) {
  try {
    await connectDatabase();
    const newOrder = await Order.create(params);
    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    console.log(error);
  }
}

export async function getOrders() {
  try {
    await connectDatabase();
    const orders = await Order.find().populate({
      path: "course",
      model: Course,
      select: "title",
    }).populate({
      path: "user",
      model: User,
      select: "username",
    });
    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    console.log(error);
  }
}
