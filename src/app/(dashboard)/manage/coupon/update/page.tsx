import Heading from "@/components/common/Heading";
import UpdateCouponPage from "@/app/page_coupon/update-coupon-container";
import React from "react";

type SearchParams = Promise<{ [key: string]: string | string }>;

const page = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  const code = searchParams.code;
  console.log(code)
  return (
    <>
      <Heading className="mb-8">Update Course</Heading>
      <UpdateCouponPage params={Promise.resolve({ code })} />
    </>
  );
};

export default page;
