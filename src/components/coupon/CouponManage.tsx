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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { debounce } from "lodash";
import Link from "next/link";
import { IconPlus } from "../icon";

const CouponManagePage = () => {
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

  return (
    <div>
      <Link
        href="/manage/coupon/new"
        className="size-10 rounded-full bg-green-500 flex items-center justify-center text-white fixed right-5 bottom-5"
      >
        <IconPlus />
      </Link>
      <div className="flex items-center justify-between mb-5">
        <Heading className="">Quản lý mã khuyến mãi</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <Input
              placeholder="Tìm kiếm đơn hàng..."
              onChange={handleSearchCourse}
            />
          </div>
        </div>
      </div>
      <Table className="table-responsive">
        <TableHeader>
          <TableRow>
            <TableHead>Mã</TableHead>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Giảm giá</TableHead>
            <TableHead>Sử dụng</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody></TableBody>
      </Table>
    </div>
  );
};

export default CouponManagePage;
