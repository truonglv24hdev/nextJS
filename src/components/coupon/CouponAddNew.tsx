"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { couponCreateSchema } from "@/types/coupon.type";
import { CouponCreateFormValues } from "@/types/coupon.type";
import { IconAdd } from "@/components/icon";
import {
  Button,
  Calendar,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  InputFormatCurrency,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RadioGroup,
  RadioGroupItem,
  Switch,
} from "@/components/ui";
import { couponTypes } from "@/constants/coupon-constant";
import { CouponType } from "@/types/enums";
import { CourseItemData } from "@/types/app.type";

const CouponAddNew = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [findCourse, setFindCourse] = useState<CourseItemData[] | undefined>(
    []
  );
  const [selectedCourses, setSelectedCourses] = useState<CourseItemData[]>([]);
  const [endDate, setEndDate] = useState<Date>();
  const form = useForm<CouponCreateFormValues>({
    resolver: zodResolver(couponCreateSchema),
    defaultValues: {
      active: true,
      type: CouponType.PERCENT,
      value: "0",
      limit: 0,
      title: "",
      code: "",
      start_date: "",
      end_date: "",
      courses: [],
    },
  });
  const couponTypeWatch = form.watch("type");

  async function onSubmit(values: CouponCreateFormValues) {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <div className="mb-8 mt-10 grid grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tiêu đề</FormLabel>
                <FormControl>
                  <Input placeholder="Tiêu đề" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input
                    className="font-bold uppercase"
                    placeholder="Mã giảm giá"
                    {...field}
                    onChange={(event) =>
                      field.onChange(event.target.value.toUpperCase())
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="start_date"
            render={() => (
              <FormItem>
                <FormLabel>Ngày bắt đầu</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button className="w-full" variant={"outline"}>
                        <CalendarIcon className="mr-2 size-4" />
                        {startDate ? (
                          format(startDate, "dd/MM/yyyy")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-auto p-0">
                      <Calendar
                        initialFocus
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end_date"
            render={() => (
              <FormItem>
                <FormLabel>Ngày kết thúc</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button className="w-full" variant={"outline"}>
                        <CalendarIcon className="mr-2 size-4" />
                        {endDate ? (
                          format(endDate, "dd/MM/yyyy")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-auto p-0">
                      <Calendar
                        initialFocus
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loại coupon</FormLabel>
                <FormControl className="h-12">
                  <RadioGroup
                    className="flex gap-5"
                    defaultValue={CouponType.PERCENT}
                    onValueChange={field.onChange}
                  >
                    {couponTypes.map((type) => (
                      <div
                        key={type.value}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem id={type.value} value={type.value} />
                        <Label className="cursor-pointer" htmlFor={type.value}>
                          {type.title}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá trị</FormLabel>
                <FormControl>
                  <div>
                    {couponTypeWatch === CouponType.PERCENT ? (
                      <Input
                        placeholder="100"
                        {...field}
                        onChange={(event) => field.onChange(event.target.value)}
                      />
                    ) : (
                      <InputFormatCurrency
                        {...field}
                        onChange={(event) => field.onChange(event.target.value)}
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trạng thái</FormLabel>
                <FormControl className="h-12">
                  <div className="flex flex-col justify-center">
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="limit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số lượng tối đa</FormLabel>
                <FormControl>
                  <Input
                    placeholder="100"
                    type="number"
                    {...field}
                    onChange={(event) =>
                      field.onChange(event.target.valueAsNumber)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="courses"
            render={() => (
              <FormItem>
                <FormLabel>Khóa học</FormLabel>
                <FormControl>
                  <div>
                    <Input placeholder="Tìm kiếm khóa học..." />
                    {!!findCourse && findCourse.length > 0 && (
                      <div className="!mt-5 flex flex-col gap-2">
                        {findCourse?.map((course) => (
                          <Label
                            key={course.title}
                            className="flex cursor-pointer items-center gap-2 text-sm font-medium"
                            htmlFor={course.title}
                          >
                            <Checkbox
                              id={course.title}
                              checked={selectedCourses.some(
                                (element) => element._id === course._id
                              )}
                              // onCheckedChange={(checked) =>
                              // }
                            />
                            <span>{course.title}</span>
                          </Label>
                        ))}
                      </div>
                    )}
                    {selectedCourses.length > 0 && (
                      <div className="!mt-5 flex flex-wrap items-start gap-2">
                        {selectedCourses?.map((course) => (
                          <div
                            key={course.title}
                            className="borderDarkMode bgDarkMode inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-sm font-semibold"
                          >
                            <span>{course.title}</span>
                            <button type="button">
                              <IconAdd className="size-5 text-gray-400 hover:text-gray-600" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="ml-auto flex w-[150px]" type="submit">
          Tạo mã
        </Button>
      </form>
    </Form>
  );
};

export default CouponAddNew;
