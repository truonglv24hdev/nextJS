import Heading from "@/components/common/Heading";
import CouponAddNew from "@/components/coupon/CouponAddNew";
import React from "react";

const page = () => {
  return (
    <div>
      <Heading>Tạo mã khuyến mãi mới</Heading>
      <CouponAddNew></CouponAddNew>
    </div>
  );
};

export default page;
