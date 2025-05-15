import CouponManagePage from "@/components/coupon/CouponManage";
import { getCoupon } from "@/lib/actions/coupon.actions";

const page = async () => {
  const coupons = await getCoupon();
  return (
    <CouponManagePage
      coupons={coupons ? JSON.parse(JSON.stringify(coupons)) : []}
    ></CouponManagePage>
  );
};

export default page;
