import { LessonItemData } from "./lesson.type";
import { ILecture } from "../database/lecture.model";

export interface LectureItemData extends Omit<ILecture, "lessons"> {
  lessons: LessonItemData[];
}
