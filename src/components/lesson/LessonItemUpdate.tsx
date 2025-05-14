"use client";

import { ILesson } from "@/database/lesson.model";
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { updateLesson } from "@/lib/actions/lesson.actions";
import { toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import { editorOptions } from "@/utils/timy_mce";

const formSchema = z.object({
  slug: z.string().optional(),
  duration: z.number().optional(),
  video_url: z.string().optional(),
  content: z.string().optional(),
});

const LessonItemUpdate = ({ lesson }: { lesson: ILesson }) => {
  const editorRef = useRef<any | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slug: lesson.slug,
      duration: lesson.duration,
      video_url: lesson.video_url,
      content: lesson.content,
    },
  });

  useEffect(() => {
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.setContent(lesson.content);
      }
    }, 1000);
  }, [lesson.content]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await updateLesson({
        lessonId: lesson._id,
        updateData: values,
      });
      if (res?.success) {
        toast.success("Cap nhat thanh cong");
      }
    } catch (error) {}
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duong dan khoa hoc</FormLabel>
                  <FormControl>
                    <Input placeholder="Duong dan khoa hoc" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thoi luong khoa hoc</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Tên khóa học"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="video_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video URL</FormLabel>
                  <FormControl>
                    <Input placeholder="video-url" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Noi dung</FormLabel>
                  <FormControl>
                    <Editor
                      apiKey="exymt5fb2mw0qzgboxs0zy3rsmrxh1xv6octdast8mejua8x"
                      onInit={(_evt: any, editor: Editor) =>
                        (editorRef.current = editor)
                      }
                      {...editorOptions(field)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end gap-5 items-center mt-5">
            <Button type="submit">Cap nhat</Button>
            <Link href="/" className="text-sm text-slate-600">
              Xem truoc
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LessonItemUpdate;
