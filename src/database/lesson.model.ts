import { ELessonType } from "@/types/enums";
import mongoose, { Document, Schema } from "mongoose";

export interface ILesson extends Document {
  _id: string;
  title: string;
  slug: string;
  lecture: Schema.Types.ObjectId;
  course: Schema.Types.ObjectId;
  order: number;
  duration: number;
  type: ELessonType;
  video_url: string;
  _destroy: boolean;
  content: string;
  createdAt: Date;
}

const lessonSchema = new Schema<ILesson>(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      slug: "title",
    },
    order: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 0,
    },
    content: {
      type: String,
    },
    video_url: {
      type: String,
    },
    _destroy: {
      type: Boolean,
      default: false,
    },
    lecture: {
      type: Schema.Types.ObjectId,
      ref: "lecture",
    },
    type: {
      type: String,
      enum: Object.values(ELessonType),
      default: ELessonType.VIDEO,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "course",
    },
  },
  {
    timestamps: true,
  }
);

const Lesson =
  mongoose.models["lesson"] || mongoose.model("lesson", lessonSchema);

export default Lesson;
