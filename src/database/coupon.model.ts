import mongoose, { Document, Schema } from "mongoose";

import { ECouponType } from "../types/enums";

export interface ICoupon extends Document {
  _id: string;
  title: string;
  code: string;
  active: boolean;
  start_date: Date;
  end_date: Date;
  used: number;
  limit: number;
  courses: Schema.Types.ObjectId[];
  type: ECouponType;
  value: number;
  created_at: Date;
}

const couponSchema = new Schema<ICoupon>({
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  start_date: {
    type: Date,
  },
  end_date: {
    type: Date,
  },
  active: {
    type: Boolean,
  },
  used: {
    type: Number,
    default: 0,
  },
  limit: {
    type: Number,
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "courses",
    },
  ],
  type: {
    type: String,
    enum: Object.values(ECouponType),
    default: ECouponType.PERCENT,
  },
  value: {
    type: Number,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Coupon =
  mongoose.models["coupon"] || mongoose.model("coupon", couponSchema);

export default Coupon;
