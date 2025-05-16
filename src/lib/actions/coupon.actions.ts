"use server";
import Coupon, { ICoupon } from "@/database/coupon.model";
import { connectDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import { CreateCouponParams, UpdateCouponParams } from "@/types/coupon.type";
import { CouponItemData } from "@/types/app.type";
import Course from "@/database/course.model";
import { toast } from "react-toastify";
import { ECourseStatus, TGetAllParams } from "@/types/enums";
import { FilterQuery } from "mongoose";

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

export async function getAllCoupon(
  params: TGetAllParams
): Promise<ICoupon[] | undefined> {
  try {
    await connectDatabase();
    const { page = 1, limit = 10, search, status } = params;
    const skip = (page - 1) * limit;
    const query: FilterQuery<typeof Coupon> = {};
    if (search) {
      query.$or = [{ code: { $regex: search, $options: "i" } }];
    }

    if (status) {
      query.status = status || ECourseStatus.APPROVED;
    }

    const coupons = await Coupon.find(query).skip(skip).limit(limit).sort({
      createdAt: -1,
    });
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

export async function getValidateCoupon(params: {
  code: string;
  courseId: string;
}): Promise<CouponItemData | undefined> {
  try {
    // console.log(params.code, params.courseId)
    await connectDatabase();
    const findCoupon = await Coupon.findOne({
      code: "PHOTO1",
    }).populate({
      path: "courses",
      model: Course,
      select: "_id title",
    });
    const coupon: CouponItemData = JSON.parse(JSON.stringify(findCoupon));
    if (!coupon?.courses || !Array.isArray(coupon.courses)) return undefined;
    const couponCourses = coupon?.courses.map((course) => course._id);
    let isActive = true;

    if (!couponCourses.includes(params.courseId)) isActive = false;
    if (!coupon?.active) isActive = false;
    if (coupon?.used >= coupon?.limit) isActive = false;
    if (coupon?.start_date && new Date(coupon?.start_date) > new Date())
      isActive = false;
    if (coupon?.end_date && new Date(coupon?.end_date) < new Date())
      isActive = false;

    return isActive ? coupon : undefined;
  } catch (error) {
    console.log(error);
  }
}
