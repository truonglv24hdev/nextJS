"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { couponCreateSchema } from "@/types/coupon.type";
import { CouponCreateFormValues } from "@/types/coupon.type";
import { IconDelete } from "@/components/icon";
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
import { ECouponType } from "@/types/enums";
import { CourseItemData } from "@/types/app.type";
import { createCoupon } from "@/lib/actions/coupon.actions";
import { toast } from "react-toastify";
import { debounce } from "lodash";
import { getAllCourse } from "@/lib/actions/course.actions";

const CouponAddNew = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [findCourse, setFindCourse] = useState<any[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<CourseItemData[]>([]);
  const [endDate, setEndDate] = useState<Date>();
  const form = useForm<CouponCreateFormValues>({
    resolver: zodResolver(couponCreateSchema),
    defaultValues: {
      active: true,
      type: ECouponType.PERCENT,
      value: "0",
      limit: 0,
      title: "",
      code: "",
      start_date: "",
      end_date: "",
      courses: [],
    },
  });
  const handleSearchCourse = debounce(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const courseList = (await getAllCourse({ search: value })) || [];
      setFindCourse(courseList);
      if (!value) setFindCourse([]);
    },
    250
  );

  const handleSelectCourse = (checked: boolean | string, course: any) => {
    if (checked) {
      setSelectedCourses((prev) => [...prev, course]);
    } else {
      setSelectedCourses((prev) =>
        prev.filter((selectedCourses) => selectedCourses._id !== course._id)
      );
    }
  };

  const couponTypeWatch = form.watch("type");

  async function onSubmit(values: CouponCreateFormValues) {
    try {
      const couponType = values.type;
      const couponValue = Number(values.value?.replace(/,/g, ""));
      if (
        couponType === ECouponType.PERCENT &&
        values?.value &&
        (Number(values.value) > 100 || Number(values.value) < 0)
      ) {
        form.setError("value", {
          message: "Giá trị phần trăm phải từ 0 đến 100",
        });
        return;
      }
      const newCoupon = await createCoupon({
        ...values,
        value: couponValue,
        start_date: startDate,
        end_date: endDate,
        courses: selectedCourses.map((course) => course._id.toString()),
      });
      if (newCoupon.code) {
        toast.success("Tao ma giam gia thanh cong");
        form.reset();
        setEndDate(undefined);
        setStartDate(undefined);
        setFindCourse([]);
        setSelectedCourses([]);
      }
    } catch (error) {
      console.log(error);
    }
  }

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
                    defaultValue={ECouponType.PERCENT}
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
                    {couponTypeWatch === ECouponType.PERCENT ? (
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Khóa học</FormLabel>
                <FormControl>
                  <>
                    <Input
                      placeholder="Tìm kiếm khóa học"
                      onChange={handleSearchCourse}
                    />
                    {findCourse?.length > 0 && (
                      <div className="flex flex-col gap-2 mt-5">
                        {findCourse?.map((course) => (
                          <Label
                            key={course.code}
                            className="flex items-center gap-2 font-medium text-sm cursor-pointer"
                            htmlFor={course.title}
                          >
                            <Checkbox
                              id={course.title}
                              onCheckedChange={(checked) =>
                                handleSelectCourse(checked, course)
                              }
                              checked={selectedCourses.some(
                                (el) => el._id === course._id
                              )}
                            />
                            <span>{course.title}</span>
                          </Label>
                        ))}
                      </div>
                    )}
                    {selectedCourses.length > 0 && (
                      <div className="flex items-start flex-wrap gap-2 mt-5">
                        {selectedCourses?.map((course) => (
                          <div
                            key={course.title}
                            className="inline-flex items-center gap-2 font-semibold text-sm px-3 py-1 rounded-lg border"
                          >
                            <span>{course.title}</span>
                            <button
                              type="button"
                              onClick={() => handleSelectCourse(false, course)}
                            >
                              <IconDelete className="size-4 text-gray-400 hover:text-gray-600" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                </FormControl>
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
