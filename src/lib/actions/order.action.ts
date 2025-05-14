"use server";
import { EOrderStatus, TCreateOrderParams, TGetAllParams } from "@/types/enums";
import { connectDatabase } from "../mongoose";
import Order, { IOrder } from "@/database/order.model";
import Course from "@/database/course.model";
import User from "@/database/user.model";
import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";

export async function createOrderCourse(params: TCreateOrderParams) {
  try {
    await connectDatabase();
    const newOrder = await Order.create(params);
    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    console.log(error);
  }
}

export async function getAllOrder(
  params: TGetAllParams
): Promise<IOrder[] | undefined> {
  try {
    await connectDatabase();
    const { page = 1, limit = 10, search, status } = params;
    const skip = (page - 1) * limit;
    const query: FilterQuery<typeof Order> = {};
    if (search) {
      query.$or = [{ code: { $regex: search, $options: "i" } }];
    }

    if (status) {
      query.status = status;
    }

    const courses = await Order.find(query)
      .skip(skip)
      .limit(limit)
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "course",
        model: Course,
        select: "title",
      })
      .populate({
        path: "user",
        model: User,
        select: "username",
      });
    return courses;
  } catch (error) {
    console.log(error);
  }
}

export async function updateOrder({
  orderId,
  status,
}: {
  orderId: string;
  status: EOrderStatus;
}) {
  try {
    await connectDatabase();
    const findOrder = await Order.findById(orderId);
    if (!findOrder) return;
    if (findOrder.status === EOrderStatus.CANCELED) return;
    await Order.findByIdAndUpdate(orderId, { status });

    if (
      status === EOrderStatus.COMPLETED &&
      findOrder.status === EOrderStatus.PENDING
    ) {
      await User.findByIdAndUpdate(findOrder.user, {
        $push: { courses: findOrder.course },
      });
    }
    revalidatePath("/manage/order");
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getOrderDetail({ code }: { code: string }) {
  try {
    await connectDatabase();
    const order = await Order.findOne({ code: code }).populate({
      path: "course",
      model: Course,
      select: "title",
    });
    return JSON.parse(JSON.stringify(order));
  } catch (error) {
    console.log(error);
  }
}
