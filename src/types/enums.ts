import { ICourse } from "@/database/course.model";
import { ILecture } from "@/database/lecture.model";
import { ILesson } from "@/database/lesson.model";

enum EUserStatus {
  ACTIVE = "ACTIVE",
  UNACTIVE = "UNACTIVE",
  BANNED = "BANNED",
}

enum EUserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  EXPERT = "EXPERT",
}

enum ECourseStatus {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}

enum ECourseLevels {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}

enum ELessonType {
  VIDEO = "VIDEO",
  TEXT = "INTERMEDIATE",
}

enum RatingStatus {
  ACTIVE = "ACTIVE",
  UNACTIVE = "UNACTIVE",
}

enum CouponType {
  PERCENT = "PERCENT",
  AMOUNT = "AMOUNT",
}

export type TCreateUserParams = {
  clerkId: string;
  username: string;
  email: string;
  name?: string;
  avatar?: string;
};

export type TCreateCourseParams = {
  title: string;
  slug?: string;
};

export type TUpdateCourseParams = {
  slug: string;
  updateData: Partial<ICourse>;
  path?: string;
};

export type TCreateLecture = {
  course: string;
  title?: string;
  order?: number;
  path?: string;
};

export type TUpdateLecture = {
  lectureId: string;
  updateData: {
    title?: string;
    order?: string;
    _destroy?: boolean;
    path?: string;
  };
};

export type TUpdateLesson = {
  lessonId: string;
  updateData: {
    title?: string;
    order?: number;
    slug?: string;
    _destroy?: boolean;
    path?: string;
    duration?: number;
    video_url?: string;
    content?: string;
  };
};

export type TUpdateCourseLecture = {
  _id: string;
  title: string;
  lesson: ILesson[];
};
export interface TCourseUpdateParams extends Omit<ICourse, "lectures"> {
  lectures: TUpdateCourseLecture[];
}

export type TCreateLesson = {
  lecture: string;
  course: string;
  title?: string;
  order?: number;
  path?: string;
  slug?: string;
};

export {
  EUserStatus,
  EUserRole,
  ECourseStatus,
  ECourseLevels,
  ELessonType,
  RatingStatus,
  CouponType,
};
