import { LectureItemData } from './lecture.type';
import {  ICourse } from '../database/course.model';
import {IRating} from '../database/rating.model'
import { UserItemData } from './use.type';
import {ICoupon} from '../database/coupon.model'

export interface RatingItemData
  extends Omit<IRating, 'course' | 'user'> {
  course: CourseItemData;
  user: UserItemData;
}

export interface CourseItemData
  extends Omit<ICourse, 'lectures' | 'rating'> {
  lectures: LectureItemData[];
  rating: RatingItemData[];
}

export interface CouponItemData extends Omit<ICoupon, 'courses'> {
  courses: CourseItemData[];
}