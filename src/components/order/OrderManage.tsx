"use client";
import {
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import Heading from "../common/Heading";
import { cn } from "@/lib/utils";
import { commonClassName } from "@/constants/course-constant";
import { orderStatus } from "@/constants/lesson-constant";
import { EOrderStatus } from "@/types/enums";
import { IconCancel, IconCheck } from "../icon";
import Swal from "sweetalert2";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { debounce } from "lodash";
import { updateOrder } from "@/lib/actions/order.action";
import { toast } from "react-toastify";

const OrderManagePage = ({
  orders = [],
}: {
  orders: {
    _id: string;
    code: string;
    course: { title: string };
    user: { username: string };
    total: number;
    status: EOrderStatus;
    amount: number;
    discount: number;
  }[];
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleSearchCourse = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      router.push(`${pathname}?${createQueryString("search", e.target.value)}`);
    },
    500
  );
  const handleSelectStatus = (status: EOrderStatus) => {
    router.push(`${pathname}?${createQueryString("status", status)}`);
  };

  const handleCompleteOrder = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {});
  };
  const handleUpdateOrder = async ({
    orderId,
    status,
  }: {
    orderId: string;
    status: EOrderStatus;
  }) => {
    if (status === EOrderStatus.CANCELED) {
      Swal.fire({
        title: "Are you sure?",
        text: "Ban co muon huy don hang",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateOrder({ orderId, status });
        }
      });
    }
    if (status === EOrderStatus.COMPLETED) {
      const res = await updateOrder({ orderId, status });
      if(res?.success){
        toast.success("Duyet don hang thanh cong")
      }
    }
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <Heading className="">Quản lý đơn hàng</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <Input
              placeholder="Tìm kiếm đơn hàng..."
              onChange={handleSearchCourse}
            />
          </div>
          <Select
            onValueChange={(value) => handleSelectStatus(value as EOrderStatus)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {orderStatus.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table className="table-responsive">
        <TableHeader>
          <TableRow>
            <TableHead>Mã đơn hàng</TableHead>
            <TableHead>Khóa học</TableHead>
            <TableHead>Thành viên</TableHead>
            <TableHead>Số tiền</TableHead>
            <TableHead>Mã giảm giá</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 &&
            orders.map((order) => {
              const orderStatusItem = orderStatus.find(
                (item) => item.value === order.status
              );
              return (
                <TableRow key={order.code}>
                  <TableCell>
                    <strong>{order.code}</strong>
                  </TableCell>
                  <TableCell>{order.course.title}</TableCell>
                  <TableCell>{order.user.username}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      <span>{order.amount.toLocaleString("vi-Vi")}</span>
                      {order.discount > 0 && (
                        <span>{order.discount.toLocaleString("vi-Vi")}</span>
                      )}
                      <strong
                        className={cn(
                          orderStatusItem?.className,
                          "bg-transparent"
                        )}
                      >
                        {order.total.toLocaleString("vi-Vi")}
                      </strong>
                    </div>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        commonClassName.status,
                        orderStatusItem?.className
                      )}
                    >
                      {orderStatusItem?.title}
                    </span>
                  </TableCell>
                  <TableCell>
                    {order.status === EOrderStatus.PENDING && (
                      <div className="flex gap-3">
                        <button
                          type="button"
                          className={commonClassName.action}
                          onClick={() =>
                            handleUpdateOrder({
                              orderId: order._id,
                              status: EOrderStatus.COMPLETED,
                            })
                          }
                        >
                          <IconCheck />
                        </button>
                        <button
                          className={commonClassName.action}
                          onClick={() =>
                            handleUpdateOrder({
                              orderId: order._id,
                              status: EOrderStatus.CANCELED,
                            })
                          }
                        >
                          <IconCancel />
                        </button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderManagePage;
