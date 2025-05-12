import mongoose, { Document, Schema } from "mongoose";

export interface IHistory extends Document {
  _id: string;
  course: Schema.Types.ObjectId;
  lesson: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  createdAt: Date;
}

const historySchema = new Schema<IHistory>(
  {
    lesson: {
      type: Schema.Types.ObjectId,
      ref: "lesson",
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "course",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const History =
  mongoose.models["history"] || mongoose.model("history", historySchema);

export default History;
