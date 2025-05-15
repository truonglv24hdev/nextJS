"use server";
import Coupon, { ICoupon } from "@/database/coupon.model";
import { connectDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import { CreateCouponParams, UpdateCouponParams } from "@/types/coupon.type";
import { CouponItemData } from "@/types/app.type";
import Course from "@/database/course.model";
import { toast } from "react-toastify";

export async function createCoupon(params: CreateCouponParams) {
  try {
    await connectDatabase();
    const existingCoupon = await Coupon.findOne({ code: params.code });
    if (existingCoupon) {
      toast.error("Code da ton tai");
      return;
    }
    const newCoupon = await Coupon.create(params);
    revalidatePath("/manage/coupon");
    return JSON.parse(JSON.stringify(newCoupon));
  } catch (error) {
    console.log(error);
  }
}

export async function getCoupon(): Promise<ICoupon[] | undefined> {
  try {
    await connectDatabase();
    const coupons = await Coupon.find();
    return JSON.parse(JSON.stringify(coupons));
  } catch (error) {
    console.log(error);
  }
}

export async function getCouponByCode(
  code: string
): Promise<CouponItemData | undefined> {
  try {
    await connectDatabase();
    const findCoupon = await Coupon.findOne({
      code: code,
    }).populate({
      path: "courses",
      model: Course,
      select: "_id title",
    });
    const coupon = JSON.parse(JSON.stringify(findCoupon));

    return coupon;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteCoupon(code: string) {
  try {
    await connectDatabase();
    await Coupon.findOneAndDelete({ code });
    revalidatePath("/manage/coupon");
    return {
      success: "Xoa thanh cong",
    };
  } catch (error) {
    console.log(error);
  }
}

export async function updateCoupon(params: UpdateCouponParams) {
  try {
    await connectDatabase();
    const updatedCoupon = await Coupon.findByIdAndUpdate(
      params._id,
      params.updateData
    );

    revalidatePath("/manage/coupon");

    return JSON.parse(JSON.stringify(updatedCoupon));
  } catch (error) {
    console.log(error);
  }
}
