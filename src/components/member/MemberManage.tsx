"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Heading from "../common/Heading";
import Image from "next/image";
import { commonClassName, courseStatus } from "@/constants/course-constant";
import { cn } from "@/lib/utils";
import { IconArrowLeft, IconArrowRight, IconPlus } from "../icon";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import Swal from "sweetalert2";
import { updateCourse } from "@/lib/actions/course.actions";
import { ECourseStatus, EUserStatus } from "@/types/enums";
import { toast } from "react-toastify";
import { Input } from "../ui";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { debounce } from "lodash";
import { IUser } from "@/database/user.model";
import { userStatus } from "@/constants/user-constant";
import { updateUser } from "@/lib/actions/user.actions";

const UserManage = ({ users }: { users: IUser[] }) => {
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

  const handleChangeStatus = async (email: string, status: EUserStatus) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Cap nhat trang thai",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Cap nhat",
        cancelButtonText: "Huy",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateUser({
            email: email,
            status:
              status === EUserStatus.ACTIVE
                ? EUserStatus.UNACTIVE
                : EUserStatus.ACTIVE,
            path: "/manage/course",
          });
          toast.success("Cap nhat trang thai thanh cong");
          router.push(`${pathname}?${createQueryString("status", "")}`);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const [page, setPage] = useState(1);
  const handleSearchName = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      router.push(`${pathname}?${createQueryString("search", e.target.value)}`);
    },
    500
  );
  const handleSelectStatus = (status: ECourseStatus) => {
    router.push(`${pathname}?${createQueryString("status", status)}`);
  };
  const handleChangePage = (type: "prev" | "next") => {
    if (type === "prev" && page === 1) return;
    if (type === "prev") setPage((page) => page - 1);
    if (type === "next") setPage((page) => page + 1);
  };
  useEffect(() => {
    router.push(`${pathname}?${createQueryString("page", page.toString())}`);
  }, [page]);
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <Heading className="mb-10">Quan li người dùng</Heading>
        <div className="flex gap-3">
          <div className="w-[300px]">
            <Input
              placeholder="Tim kiem nguoi dung..."
              onChange={handleSearchName}
            />
          </div>
          <Select
            onValueChange={(value) =>
              handleSelectStatus(value as ECourseStatus)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="chon trang thai" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {userStatus.map((status) => (
                  <SelectItem value={status.value} key={status.value}>
                    {status.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Avatar</TableHead>
            <TableHead>Ten</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Trang thai</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length > 0 &&
            users.map((user) => (
              <TableRow key={user.email}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={user.avatar}
                      alt={user.username}
                      width={40}
                      height={40}
                      className="flex-shrink-0 size-16 rounded-lg object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-bold text-base">{user.username}</span>
                </TableCell>
                <TableCell>
                  <span className="font-bold text-base">{user.email}</span>
                </TableCell>
                <TableCell>
                  <button
                    type="button"
                    className={cn(
                      commonClassName.status,
                      userStatus.find((item) => item.value === user.status)
                        ?.className
                    )}
                    onClick={() => handleChangeStatus(user.email, user.status)}
                  >
                    {
                      userStatus.find((item) => item.value === user.status)
                        ?.title
                    }
                  </button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className="flex justify-end gap-3 mt-5">
        <button
          className={commonClassName.paginationButton}
          onClick={() => handleChangePage("prev")}
        >
          <IconArrowLeft />
        </button>
        <button
          className={commonClassName.paginationButton}
          onClick={() => handleChangePage("next")}
        >
          <IconArrowRight />
        </button>
      </div>
    </div>
  );
};

export default UserManage;
