"use client";
import { debounce } from "lodash";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

import { getValidateCoupon } from "@/lib/actions/coupon.actions";
import { Input } from "@/components/ui";
import { ECouponType } from "@/types/enums";

interface CouponFormProps {
  originalPrice: number;
  courseId: string;
  setPrice: Dispatch<SetStateAction<number>>;
  setCouponId: Dispatch<SetStateAction<string>>;
}
const CouponForm = ({
  courseId,
  originalPrice,
  setCouponId,
  setPrice,
}: CouponFormProps) => {
  const [isApplied, setIsApplied] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    setIsApplied(false);
  }, [couponCode]);

  const handleApplyCoupon = async () => {
    if (isApplied || couponCode === "") return;
    try {
      const response = await getValidateCoupon({
        code: couponCode.toUpperCase(),
        courseId,
      });
      const couponType = response?.type;
      let finalPrice = originalPrice;

      if (!response) {
        toast.error("Mã giảm giá không hợp lệ");
        setCouponCode("");
        setCouponId("");

        return;
      }

      if (couponType === ECouponType.PERCENT) {
        finalPrice = originalPrice - (originalPrice * response?.value) / 100;
      } else if (couponType === ECouponType.AMOUNT) {
        finalPrice = originalPrice - response?.value;
      }
      setPrice(finalPrice);
      toast.success("Áp dụng mã giảm giá thành công");
      setIsApplied(true);
      setCouponId(response._id);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeCoupon = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCouponCode(event.target.value);
      if (event.target.value === "") {
        setIsApplied(false);
        setPrice(originalPrice);
        setCouponId("");
      }
    },
    500
  );

  console.log(couponCode);

  return (
    <div className="relative mt-5 flex items-center">
      <Input
        className="pr-20 font-sm uppercase bg-amber-50"
        defaultValue={couponCode}
        placeholder="mã giảm giá"
        onChange={handleChangeCoupon}
      />
      <button
        className="h-10 w-30 text-nowrap ml-2 text-base font-sm border rounded-lg bg-blue-600"
        onClick={handleApplyCoupon}
      >
        Áp dụng
      </button>
    </div>
  );
};

export default CouponForm;
