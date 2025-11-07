import CoursesPage from "@/components/pages/CoursesPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Khóa học - Unica",
  description: "Khám phá các khóa học trực tuyến chất lượng cao tại Unica",
};

export default function Courses() {
  return <CoursesPage />;
}
