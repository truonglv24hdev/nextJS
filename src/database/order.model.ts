import { EOrderStatus } from "@/types/enums";
import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
  _id: string;
  code: string;
  course: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  total: number;
  amount: number;
  discount: number;
  status: EOrderStatus;
  createdAt: Date;
  coupon: Schema.Types.ObjectId;
}

const orderSchema = new Schema<IOrder>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "course",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    total: {
      type: Number,
    },
    amount: {
      type: Number,
    },
    discount: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: Object.values(EOrderStatus),
      default: EOrderStatus.PENDING,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models["order"] || mongoose.model("order", orderSchema);

export default Order;
