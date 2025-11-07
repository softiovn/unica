"use client";

import { Tabs } from "antd";
import { unicaApi, Course } from "@/utils/api";
import CourseGrid from "./CourseGrid";

async function CoursesTab({ type }: { type: string }) {
  let courses: Course[] = [];

  try {
    const result = await unicaApi.getAllCourses(0, type || undefined);
    courses = result.courses;
  } catch (error) {
    console.error("Error loading courses:", error);
    courses = [];
  }

  return <CourseGrid courses={courses} />;
}

export default function CoursesContent() {
  return (
    <Tabs
      defaultActiveKey="all"
      size="large"
      items={[
        {
          key: "all",
          label: "Tất cả",
          children: <CoursesTab type="" />,
        },
        {
          key: "hot",
          label: "Nổi bật",
          children: <CoursesTab type="hot" />,
        },
        {
          key: "new",
          label: "Mới nhất",
          children: <CoursesTab type="new" />,
        },
        {
          key: "best-sell",
          label: "Bán chạy",
          children: <CoursesTab type="best-sell" />,
        },
      ]}
    />
  );
}
