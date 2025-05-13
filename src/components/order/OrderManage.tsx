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

const OrderManagePage = ({
  orders = [],
}: {
  orders: {
    code: string;
    course: { title: string };
    user: { username: string };
    total: number;
    status: EOrderStatus;
    amount: number;
    discount: number;
  }[];
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <Heading className="">Quản lý đơn hàng</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <Input placeholder="Tìm kiếm đơn hàng..." />
          </div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="/">Tất cả</SelectItem>
                <SelectItem value="/">Tat ca</SelectItem>
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
            orders.map((order) => (
              <TableRow key={order.code}>
                <TableCell>
                  <strong>{order.code}</strong>
                </TableCell>
                <TableCell>{order.course.title}</TableCell>
                <TableCell>{order.user.username}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <span
                    className={cn(
                      commonClassName.status,
                      orderStatus.find((item) => item.value === order.status)
                        ?.className
                    )}
                  >
                    {
                      orderStatus.find((item) => item.value === order.status)
                        ?.title
                    }
                  </span>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderManagePage;
