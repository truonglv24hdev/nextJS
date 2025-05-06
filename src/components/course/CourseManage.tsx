"use client";
import React from "react";
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
import {
  IconDelete,
  IconEdit,
  IconEye,
  IconPlay,
  IconStudy,
  IconArrowLeft,
  IconArrowRight,
  IconPlus,
} from "../icon";
import Link from "next/link";
import { ICourse } from "@/database/course.model";
import Swal from "sweetalert2";
import { updateCourse } from "@/lib/actions/course.actions";
import { ECourseStatus } from "@/types/enums";
import { toast } from "react-toastify";
import { Input } from "../ui";

const CourseManage = ({ courses }: { courses: ICourse[] }) => {
  const handleDeleteCourse = (slug: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateCourse({
          slug,
          updateData: { status: ECourseStatus.PENDING, _destroy: true },
          path: "/manage/course",
        });
        toast.success("Xoa thanh cong");
      }
    });
  };

  const handleChangeStatus = async (slug: string, status: ECourseStatus) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, change it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateCourse({
            slug,
            updateData: {
              status: ECourseStatus.PENDING
                ? ECourseStatus.APPROVED
                : ECourseStatus.PENDING,
              _destroy: false,
            },
            path: "/manage/course",
          });
          toast.success("Cap nhat trang thai thanh cong");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Link
        href="/manage/course/new"
        className="size-10 rounded-full bg-green-500 flex items-center justify-center text-white fixed right-5 bottom-5"
      >
        <IconPlus />
      </Link>
      <div className="flex items-center justify-between mb-5">
        <Heading className="mb-10">Quan li khoa hoc</Heading>
        <div className="w-[300px]">
          <Input placeholder="Tim kiem khoa hoc..." />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Thong tin</TableHead>
            <TableHead>Gia</TableHead>
            <TableHead>Trang thai</TableHead>
            <TableHead>Hanh dong</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.length > 0 &&
            courses.map((course) => (
              <TableRow key={course.slug}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={course.img}
                      alt={course.title}
                      width={40}
                      height={40}
                      className="flex-shrink-0 size-16 rounded-lg object-cover"
                    />
                    <div className="flex flex-col gap-1">
                      <h3 className="font-bold text-base">{course.title}</h3>
                      <h4 className="text-sm text-slate-500">
                        {new Date(course.createdAt).toLocaleDateString("vi-VI")}
                      </h4>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-bold text-base">
                    {course.price.toLocaleString()}
                  </span>
                </TableCell>
                <TableCell>
                  <button
                    type="button"
                    className={cn(
                      commonClassName.status,
                      courseStatus.find((item) => item.value === course.status)
                        ?.className
                    )}
                    onClick={() =>
                      handleChangeStatus(course.slug, course.status)
                    }
                  >
                    {
                      courseStatus.find((item) => item.value === course.status)
                        ?.title
                    }
                  </button>
                </TableCell>
                <TableCell>
                  <div className="flex gap-3">
                    <Link
                      className={commonClassName.action}
                      href={`/manage/course/update-content?slug=${course.slug}`}
                    >
                      <IconStudy />
                    </Link>
                    <Link
                      href={`/course/${course.slug}`}
                      className={commonClassName.action}
                    >
                      <IconEye />
                    </Link>
                    <Link
                      href={`/manage/course/update?slug=${course.slug}`}
                      className={commonClassName.action}
                    >
                      <IconEdit />
                    </Link>
                    <button
                      onClick={() => handleDeleteCourse(course.slug)}
                      className={commonClassName.action}
                    >
                      <IconDelete />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className="flex justify-end gap-3 mt-5">
        <button className={commonClassName.paginationButton}>
          <IconArrowLeft />
        </button>
        <button className={commonClassName.paginationButton}>
          <IconArrowRight />
        </button>
      </div>
    </div>
  );
};

export default CourseManage;
