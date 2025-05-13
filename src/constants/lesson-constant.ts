import { BadgeStatusVariant } from "../types/common";
import { EOrderStatus } from "../types/enums";

export const orderStatus: {
  title: string;
  value: EOrderStatus;
  className?: string;
  variant?: BadgeStatusVariant;
}[] = [
  {
    title: "Đã duyệt",
    value: EOrderStatus.COMPLETED,
    className: "text-green-500 bg-green-500/10",
    variant: "success",
  },
  {
    title: "Chờ duyệt",
    value: EOrderStatus.PENDING,
    className: "text-orange-500 bg-orange-500/10",
    variant: "warning",
  },
  {
    title: "Từ chối",
    value: EOrderStatus.CANCELED,
    className: "text-red-500 bg-red-500/10",
    variant: "danger",
  },
];

