import UpdateCouponContainer from "@/components/coupon/CouponUpdate";
import { getCouponByCode } from "@/lib/actions/coupon.actions";

interface UpdateCoursePageProps {
  params: Promise<{ code: string }>;
}

async function UpdateCouponPage({ params }: UpdateCoursePageProps) {
  const { code } = await params;
  if (!code) {
    return <div>Missing code</div>;
  }

  const foundCoupon = await getCouponByCode(code);

  if (!foundCoupon) {
    return <div>Course not found</div>;
  }

  const plainCoupon = JSON.parse(JSON.stringify(foundCoupon));

  return <UpdateCouponContainer couponDetails={plainCoupon} />;
}

export default UpdateCouponPage;
