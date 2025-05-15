"use client";
import {
  Input,
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
import { IconCheck, IconDelete, IconEdit, IconPlus } from "../icon";
import { ICoupon } from "@/database/coupon.model";
import { ECouponType } from "@/types/enums";
import { cn } from "@/lib/utils";
import { commonClassName } from "@/constants/course-constant";
import { couponStatuses } from "@/constants/coupon-constant";
import Swal from "sweetalert2";
import { deleteCoupon } from "@/lib/actions/coupon.actions";
import { toast } from "react-toastify";

const CouponManagePage = ({ coupons }: { coupons: ICoupon[] }) => {
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

  const handleDeleteCoupon = async (code: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want delete",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const result = await deleteCoupon(code);
          if (result?.success) toast.success("Xoa thanh cong");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

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
        <TableBody>
          {coupons &&
            coupons?.length > 0 &&
            coupons.map((coupon) => (
              <TableRow key={coupon.code}>
                <TableCell>
                  <strong>{coupon.code}</strong>
                </TableCell>
                <TableCell>
                  <strong>{coupon.title}</strong>
                </TableCell>
                <TableCell>
                  {coupon.type === ECouponType.AMOUNT ? (
                    <>{coupon.value.toLocaleString("vi-VI")}</>
                  ) : (
                    <>{coupon.value}%</>
                  )}
                </TableCell>
                <TableCell>
                  {coupon.used}/{coupon.limit}
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      commonClassName.status,
                      couponStatuses.find(
                        (item) => item.value === coupon.active
                      )?.className
                    )}
                  >
                    {
                      couponStatuses.find(
                        (item) => item.value === coupon.active
                      )?.title
                    }
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-3">
                    <Link
                      href={`/manage/coupon/update?code=${coupon.code}`}
                      className={commonClassName.action}
                    >
                      <IconEdit />
                    </Link>
                    <button
                      className={commonClassName.action}
                      onClick={() => handleDeleteCoupon(coupon.code)}
                    >
                      <IconDelete />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CouponManagePage;
