import { ECouponType } from "@/types/enums";

export const couponTypes: {
  title: string;
  value: ECouponType;
}[] = [
  {
    title: "Phần trăm",
    value: ECouponType.PERCENT,
  },
  {
    title: "Giá trị",
    value: ECouponType.AMOUNT,
  },
];
export const couponStatuses = [
  {
    title: "Đang kích hoạt",
    className: "text-green-500 bg-green-500/10",
    value: true,
  },
  {
    title: "Chưa kích hoạt",
    className: "text-red-500 bg-red-500/10",
    value: false,
  },
];
