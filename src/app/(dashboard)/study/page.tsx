import { CourseGrid } from '@/components/common'
import CourseItem from '@/components/course/CourseItem'
import React from 'react'

const page = () => {
  return (
    <CourseGrid>
    <CourseItem></CourseItem>
    <CourseItem></CourseItem>
    <CourseItem></CourseItem>
  </CourseGrid>
  )
}

export default page