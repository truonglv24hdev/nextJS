"use server";

import Coupon from "@/database/coupon.model";
import { connectDatabase } from "../mongoose";

export async function createCoupon(params: any) {
  try {
    await connectDatabase();
    const newCoupon = await Coupon.create(params);
    return JSON.parse(JSON.stringify(newCoupon));
  } catch (error) {
    console.log(error);
  }
}
