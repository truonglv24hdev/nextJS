import OrderManagePage from "@/components/order/OrderManage";
import { getOrders } from "@/lib/actions/order.action";

const page = async () => {
  const orders = await getOrders();
  return <OrderManagePage orders={orders}></OrderManagePage>;
};

export default page;
