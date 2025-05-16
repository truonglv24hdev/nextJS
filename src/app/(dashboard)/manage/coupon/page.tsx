import CouponManagePage from "@/components/coupon/CouponManage";
import { getAllCoupon } from "@/lib/actions/coupon.actions";
import { ECourseStatus } from "@/types/enums";

type PageProps = {
  searchParams: Promise<{
    page: number;
    limit: number;
    search?: string;
    status?: ECourseStatus;
  }>;
};

const page = async ({ searchParams }: PageProps) => {
  const resolvedSearchParams = await searchParams;
  const coupons = await getAllCoupon({
    page: resolvedSearchParams.page || 1,
    limit: 10,
    search: resolvedSearchParams.search,
    status: resolvedSearchParams.status,
  });
  return (
    <CouponManagePage
      coupons={coupons ? JSON.parse(JSON.stringify(coupons)) : []}
    ></CouponManagePage>
  );
};

export default page;
