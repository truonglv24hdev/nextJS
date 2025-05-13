"use client";
import { Button } from "@/components/ui";
import { IUser } from "@/database/user.model";
import { createOrderCourse } from "@/lib/actions/order.action";
import { createOrderCode } from "@/utils";
import React from "react";
import { toast } from "react-toastify";

const ButtonBuyCourse = ({
  user,
  courseId,
  amount,
}: {
  user: IUser | null | undefined;
  amount: number;
  courseId: string;
}) => {
  const handleBuyCourse = async () => {
    if (!user?.username) {
      toast.error("Dang nhat de mua khoa hoc");
      return;
    }
    const newOrder = await createOrderCourse({
      code: createOrderCode(),
      course: courseId,
      user: user._id as string,
      total: amount,
      amount: amount,
    });
  };
  return (
    <Button className="w-full" onClick={handleBuyCourse}>
      Mua khoa hoc
    </Button>
  );
};

export default ButtonBuyCourse;
