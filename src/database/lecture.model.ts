import mongoose, { Document, Schema } from "mongoose";

export interface ILecture extends Document {
  _id: string;
  title: string;
  lesson: Schema.Types.ObjectId[];
  _destroy: boolean;
  order: number;
  course: Schema.Types.ObjectId;
  createdAt: Date;
}

const lectureSchema = new Schema<ILecture>(
  {
    title: {
      type: String,
      required: true,
    },
    lesson: [
      {
        type: Schema.Types.ObjectId,
        ref: "lesson",
      },
    ],
    course: {
      type: Schema.Types.ObjectId,
      ref: "course",
    },
    order: {
      type: Number,
    },
    _destroy: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Lecture =
  mongoose.models["lecture"] || mongoose.model("lecture", lectureSchema);

export default Lecture;
