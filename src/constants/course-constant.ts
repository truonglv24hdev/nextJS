import { BadgeStatusVariant } from "../types/common";
import { ECourseLevels, ECourseStatus } from "../types/enums";

export const courseStatus: {
  title: string;
  value: ECourseStatus;
  className?: string;
  variant?: BadgeStatusVariant;
}[] = [
  {
    title: "Đã duyệt",
    value: ECourseStatus.APPROVED,
    className: "text-green-500 bg-green-500/10",
    variant: "success",
  },
  {
    title: "Chờ duyệt",
    value: ECourseStatus.PENDING,
    className: "text-orange-500 bg-orange-500/10",
    variant: "warning",
  },
  {
    title: "Từ chối",
    value: ECourseStatus.REJECTED,
    className: "text-red-500 bg-red-500/10",
    variant: "danger",
  },
];
export const courseLevel: {
  title: string;
  value: ECourseLevels;
}[] = [
  {
    title: "Dễ",
    value: ECourseLevels.BEGINNER,
  },
  {
    title: "Trung bình",
    value: ECourseLevels.INTERMEDIATE,
  },
  {
    title: "Khó",
    value: ECourseLevels.ADVANCED,
  },
];
export const courseLevelTitle: Record<ECourseLevels, string> = {
  [ECourseLevels.BEGINNER]: "Dễ",
  [ECourseLevels.INTERMEDIATE]: "Trung bình",
  [ECourseLevels.ADVANCED]: "Khó",
};

export const commonClassName = {
  status:
    "bg-opacity-10 border border-current rounded-md font-medium px-3 py-1 text-xs",
  action:
    "size-8 rounded-md border-gray-200 items-center justify-center p-2 bg-gray-100 hover:bg-white",
  paginationButton:
    "size-10 rounded-md border flex items-center justify-center hover:border-red-400 transition-all",
};
