import PageNotFound from "@/app/not-found";
import { getOrderDetail } from "@/lib/actions/order.action";
import React from "react";

const OrderDetail = async ({
  params,
}: {
  params: Promise<{ code: string }>;
}) => {
  const { code } = await params;
  const orderDetail = await getOrderDetail({ code: code });
  if (!orderDetail) return <PageNotFound />;
  return (
    <div className="flex flex-col gap-5">
      <p>
        Cam on ban da mua khoa hoc{""}
        <strong className="text-blue-600">{orderDetail.course.title}</strong>
        {""} voi so tien la{""}
        <strong className="text-blue-600">{orderDetail.total}</strong>
      </p>
      <p>
        Co ma code nhu sau:{""}
        <strong className="text-blue-600">{orderDetail.code}</strong>
      </p>
    </div>
  );
};

export default OrderDetail;
