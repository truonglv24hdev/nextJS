"use client";

import React, { MouseEvent, useState } from "react";
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
import { TCourseUpdateParams, TUpdateCourseLecture } from "@/types/enums";
import { cn } from "@/lib/utils";
import { createLesson, updateLesson } from "@/lib/actions/lesson.actions";
import { ILesson } from "@/database/lesson.model";
import slugify from "slugify";
import LessonItemUpdate from "../lesson/LessonItemUpdate";

const CourseUpdateContent = ({ course }: { course: TCourseUpdateParams }) => {
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
        toast.success("Cap nhap thanh cong");
        setLectureIdEdit("");
        setLectureEdit("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddNewLesson = async (lectureId: string, courseId: string) => {
    try {
      const res = await createLesson({
        path: `manage/course/update-content?slug=${course.slug}`,
        lecture: lectureId,
        course: courseId,
        title: "Tieu de bai hoc moi",
        slug: `Tieu-de-bai-hoc-moi-${new Date()
          .getTime()
          .toString()
          .slice(-3)}`,
      });
      if (res?.success) {
        toast.success("Them thanh cong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateLesson = async (
    e: MouseEvent<HTMLSpanElement>,
    lessonId: string
  ) => {
    e.stopPropagation();
    try {
      const res = await updateLesson({
        lessonId,
        updateData: {
          slug: slugify(lessonEdit, { lower: true, locale: "vi", remove:/[*+~.()'"!:@]/g }),
          title: lessonEdit,
          path: `manage/course/update-content?slug=${course.slug}`,
        },
      });
      if (res?.success) {
        toast.success("Cap nhap thanh cong");
        setLessonIdEdit("");
        setLessonEdit("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteLesson = async (
    e: MouseEvent<HTMLSpanElement>,
    lessonId: string
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
          const res = await updateLesson({
            lessonId,
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

  const [lectureEdit, setLectureEdit] = useState("");
  const [lessonEdit, setLessonEdit] = useState("");
  const [lectureIdEdit, setLectureIdEdit] = useState("");
  const [lessonIdEdit, setLessonIdEdit] = useState("");

  return (
    <div>
      <div className="flex flex-col gap-5">
        {lectures.map((lecture: TUpdateCourseLecture) => (
          <div key={lecture._id}>
            <Accordion type="single" collapsible={!lectureIdEdit}>
              <AccordionItem value={lecture._id}>
                <AccordionTrigger>
                  <div className="flex items-center gap-3 justify-between w-full pr-5">
                    {lecture._id === lectureIdEdit ? (
                      <>
                        <div className="w-full">
                          <Input
                            placeholder="Ten chuong"
                            defaultValue={lecture.title}
                            onChange={(e) => {
                              setLectureEdit(e.target.value);
                            }}
                          />
                        </div>
                        <div className="flex gap-2">
                          <span
                            className={cn(
                              commonClassName.action,
                              "text-green-500"
                            )}
                            onClick={(e) => handleUpdateLecture(e, lecture._id)}
                          >
                            <IconCheck />
                          </span>
                          <span
                            className={cn(
                              commonClassName.action,
                              "text-red-500"
                            )}
                            onClick={(e) => {
                              e.stopPropagation(), setLectureIdEdit("");
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
                              setLectureIdEdit(lecture._id);
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
                <AccordionContent className="border-none !bg-transparent">
                  <div className="flex flex-col gap-5">
                    {lecture.lesson.map((item: ILesson) => (
                      <Accordion
                        type="single"
                        collapsible={!lessonIdEdit}
                        key={item._id}
                      >
                        <AccordionItem value={item._id}>
                          <AccordionTrigger>
                            <div className="flex items-center gap-3 justify-between w-full pr-5">
                              {item._id === lessonIdEdit ? (
                                <>
                                  <div className="w-full">
                                    <Input
                                      placeholder="Ten bai hoc"
                                      defaultValue={item.title}
                                      onChange={(e) => {
                                        setLessonEdit(e.target.value);
                                      }}
                                    />
                                  </div>
                                  <div className="flex gap-2">
                                    <span
                                      className={cn(
                                        commonClassName.action,
                                        "text-green-500"
                                      )}
                                      onClick={(e) =>
                                        handleUpdateLesson(e, item._id)
                                      }
                                    >
                                      <IconCheck />
                                    </span>
                                    <span
                                      className={cn(
                                        commonClassName.action,
                                        "text-red-500"
                                      )}
                                      onClick={(e) => {
                                        e.stopPropagation(),
                                          setLessonIdEdit("");
                                      }}
                                    >
                                      <IconCancel />
                                    </span>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div>{item.title}</div>
                                  <div className="flex gap-2">
                                    <span
                                      className={commonClassName.action}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setLessonIdEdit(item._id);
                                      }}
                                    >
                                      <IconEdit />
                                    </span>
                                    <span
                                      className={commonClassName.action}
                                      onClick={(e) =>
                                        handleDeleteLesson(e, item._id)
                                      }
                                    >
                                      <IconDelete />
                                    </span>
                                  </div>
                                </>
                              )}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <LessonItemUpdate lesson={item}></LessonItemUpdate>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Button
              onClick={() => handleAddNewLesson(lecture._id, course._id)}
              className="mt-5 ml-auto w-fit block"
            >
              Them bai moi
            </Button>
          </div>
        ))}
      </div>
      <Button onClick={handleNewLecture} className="mt-5">
        Them chuong moi
      </Button>
    </div>
  );
};

export default CourseUpdateContent;
