import { ILesson } from '../database/lesson.model';

export interface LessonItemData
  extends Omit<ILesson, 'course' | 'lecture'> {
  course: string;
  lecture: string;
}