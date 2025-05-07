"use client";

import React, { MouseEvent } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { commonClassName } from "@/constants/course-constant";
import { IconCancel, IconCheck, IconDelete, IconEdit } from "../icon";
import { Button, Input } from "../ui";
import { createLecture, updateLecture } from "@/lib/actions/lecture.actions";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { ILecture } from "@/database/lecture.model";
import { TCourseUpdateParams } from "@/types/enums";
import { useImmer } from "use-immer";

const CourseUpdateContent = ({ course }: { course: TCourseUpdateParams }) => {
  console.log(course);
  const lectures = course.lectures;
  const handleNewLecture = async () => {
    try {
      const res = await createLecture({
        title: "chuong moi",
        course: course._id,
        order: lectures.length + 1,
        path: `manage/course/update-content?slug=${course.slug}`,
      });
      if (res?.success) {
        toast.success("Them chuong moi thanh cong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteLecture = async (
    e: MouseEvent<HTMLSpanElement>,
    lectureId: string
  ) => {
    e.stopPropagation();
    try {
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
          const res = await updateLecture({
            lectureId,
            updateData: {
              _destroy: true,
              path: `manage/course/update-content?slug=${course.slug}`,
            },
          });
          if (res?.success) {
            toast.success("Xoa thanh cong");
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateLecture = async (
    e: MouseEvent<HTMLSpanElement>,
    lectureId: string
  ) => {
    e.stopPropagation();
    try {
      const res = await updateLecture({
        lectureId,
        updateData: {
          title: lectureEdit,
          path: `manage/course/update-content?slug=${course.slug}`,
        },
      });
      if (res?.success) {
        toast.success("Xoa thanh cong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [lectureEdit, setLectureEdit] = useImmer("");
  const [lectureIndex, setLectureIndex] = useImmer(-1);

  return (
    <div>
      <div className="flex flex-col gap-5">
        {lectures.map((lecture: ILecture, index) => (
          <Accordion type="single" collapsible key={lecture._id}>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex items-center gap-3 justify-between w-full pr-5">
                  {index === lectureIndex ? (
                    <>
                      <div className="w-full">
                        <Input
                          placeholder="Ten chuong"
                          defaultValue={lecture.title}
                          onChange={(e) => {
                            e.stopPropagation();
                            setLectureEdit((draft) => {
                              draft = e.target.value;
                            });
                          }}
                        />
                      </div>
                      <div className="flex gap-2">
                        <span
                          className={commonClassName.action}
                          onClick={e => handleUpdateLecture(e,lecture._id)}
                        >
                          <IconCheck />
                        </span>
                        <span
                          className={commonClassName.action}
                          onClick={(e) => {
                            e.stopPropagation(), setLectureIndex(-1);
                          }}
                        >
                          <IconCancel />
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>{lecture.title}</div>
                      <div className="flex gap-2">
                        <span
                          className={commonClassName.action}
                          onClick={(e) => {
                            e.stopPropagation();
                            setLectureIndex(index);
                          }}
                        >
                          <IconEdit />
                        </span>
                        <span
                          className={commonClassName.action}
                          onClick={(e) => handleDeleteLecture(e, lecture._id)}
                        >
                          <IconDelete />
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
      <Button onClick={handleNewLecture} className="mt-5">
        Them chuong moi
      </Button>
    </div>
  );
};

export default CourseUpdateContent;
