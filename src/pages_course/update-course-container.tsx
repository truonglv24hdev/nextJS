import { getCourseBySlug } from "../lib/actions/course.actions";
import UpdateCourseContainer from "../components/course/CourseUpdate";

interface UpdateCoursePageProps {
  params: Promise<{ slug: string }>;
}

async function UpdateCoursePage({ params }: UpdateCoursePageProps) {
  const { slug } = await params;
  if (!slug) {
    return <div>Missing slug</div>;
  }

  const foundCourse = await getCourseBySlug({ slug });

  if (!foundCourse) {
    return <div>Course not found</div>;
  }

  const plainCourse = JSON.parse(JSON.stringify(foundCourse));

  return <UpdateCourseContainer course={plainCourse} />;
}

export default UpdateCoursePage;
