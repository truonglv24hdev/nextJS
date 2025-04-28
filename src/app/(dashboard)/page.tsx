import { CourseGrid } from "@/components/common";
import CourseItem from "@/components/course/CourseItem";
import Heading from "@/components/layout/Heading";
import createUser from "@/lib/actions/user.actions";
import { SignIn } from "@clerk/nextjs";
import React from "react";

const page = async ({}) => {
  const user = await createUser({clerkId:"123",email:"truong@gmail.com",username:"truong"})
  if(!user){
    return <SignIn></SignIn>
  }
  return (
    <div>
      <Heading> Khám phá</Heading>
      <CourseGrid>
        <CourseItem></CourseItem>
        <CourseItem></CourseItem>
        <CourseItem></CourseItem>
      </CourseGrid>
    </div>
  );
};

export default page;
