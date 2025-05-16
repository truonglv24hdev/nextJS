import { EUserStatus } from "@/types/enums";

export const userStatus: {
  title: string;
  value: EUserStatus;
  className?: string;
}[] = [
  {
    title: "Hoạt động",
    value: EUserStatus.ACTIVE,
    className: "text-green-500 bg-green-500/10",
  },
  {
    title: "Không hoạt động",
    value: EUserStatus.UNACTIVE,
    className: "text-orange-500 bg-orange-500/10",
  },
  {
    title: "Bị cấm",
    value: EUserStatus.BANNED,
    className: "text-red-500 bg-red-500/10",
  },
];