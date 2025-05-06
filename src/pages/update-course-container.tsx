import { getCourseBySlug } from "../lib/actions/course.actions";
import UpdateCourseContainer from "../components/course/CourseUpdate";

export interface UpdateCoursePageProps {
  slug: string;
}

async function UpdateCoursePage({ slug }: UpdateCoursePageProps) {
  const foundCourse = await getCourseBySlug({
    slug,
  });

  if (!foundCourse) return null;

  const plainCourse = JSON.parse(JSON.stringify(foundCourse));

  return <UpdateCourseContainer course={plainCourse} />;
}

export default UpdateCoursePage;
