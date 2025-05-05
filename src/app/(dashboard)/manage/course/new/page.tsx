import Heading from '@/components/common/Heading'
import CourseAddNew from '@/components/course/CourseAddNew'
import React from 'react'

const page = () => {
  return (
    <div>
      <Heading>
        Tạo khóa học mới
      </Heading>
      <CourseAddNew></CourseAddNew>
    </div>
  )
}

export default page