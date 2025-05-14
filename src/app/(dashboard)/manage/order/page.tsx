import OrderManagePage from "@/components/order/OrderManage";
import { getAllOrder } from "@/lib/actions/order.action";
import { EOrderStatus } from "@/types/enums";

type PageProps = {
  searchParams: Promise<{
    page: number;
    limit: number;
    search?: string;
    status?: EOrderStatus;
  }>;
};

const page = async ({ searchParams }: PageProps) => {
  const resolvedSearchParams = await searchParams;
  const orders = await getAllOrder({
    page: resolvedSearchParams.page || 1,
    limit: 10,
    search: resolvedSearchParams.search,
    status: resolvedSearchParams.status,
  });
  return (
    <OrderManagePage
      orders={orders ? JSON.parse(JSON.stringify(orders)) : []}
    ></OrderManagePage>
  );
};

export default page;
