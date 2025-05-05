import mongoose, { Document, Schema } from "mongoose";
import { EUserRole, EUserStatus } from "@/types/enums";

export interface IUser extends Document {
  clerkId: string;
  username: string;
  email: string;
  avatar: string;
  courses: Schema.Types.ObjectId[];
  status: EUserStatus;
  role: EUserRole;
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    clerkId: {
      type: String,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    role: {
      type: String,
      enum: Object.values(EUserRole),
      default: EUserRole.USER,
    },
    status: {
      type: String,
      enum: Object.values(EUserStatus),
      default: EUserStatus.ACTIVE,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models["user"] || mongoose.model("user", userSchema);

export default User;
