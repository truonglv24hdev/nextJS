import mongoose, { Document, Schema } from "mongoose";
import { ECourseLevels, ECourseStatus } from "@/types/enums";

export interface ICourse extends Document {
  _id: string;
  title: string;
  img: string;
  intro_url: string;
  des: string;
  price: number;
  sale_price: number;
  slug: string;
  author: Schema.Types.ObjectId;
  status: ECourseStatus;
  createdAt: Date;
  level: ECourseLevels;
  view: number;
  _destroy: boolean;
  rating: number[];
  info: {
    requirement: string[];
    benefit: string[];
    qa: [{
      question: string;
      answer: string;
    }];
  };
  lectures: Schema.Types.ObjectId[];
}

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      default:""
    },
    intro_url: {
      type: String,
      default: ""
    },
    des: {
      type: String,
      default:""
    },
    price: {
      type: Number,
      default:0
    },
    sale_price: {
      type: Number,
      default:0
    },
    slug: {
      type: String,
      slug: "title",
      unique: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    status: {
      type: String,
      enum: Object.values(ECourseStatus),
      default: ECourseStatus.PENDING,
    },
    level: {
      type: String,
      enum: Object.values(ECourseLevels),
      default: ECourseLevels.BEGINNER,
    },
    view: {
      type: Number,
      default: 0,
    },
    rating: [{ type: [Number], default: 5 }],
    lectures: [{ type: Schema.Types.ObjectId, ref: "lecture" }],
    info: {
      requirement: { type: [String] },
      benefit: { type: [String] },
      qa: [{ question: { type: String }, answer: { type: String } }],
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

const Course =
  mongoose.models["course"] || mongoose.model("course", courseSchema);

export default Course;
