"use client";

import { Row, Col, Empty, Spin } from "antd";
import CourseCard from "./CourseCard";
import type { Course } from "@/utils/api";

interface CourseGridProps {
  courses: Course[];
  loading?: boolean;
}

export default function CourseGrid({
  courses,
  loading = false,
}: CourseGridProps) {
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <Empty
        description="Không tìm thấy khóa học nào"
        style={{ margin: "40px 0" }}
      />
    );
  }

  return (
    <Row gutter={[16, 24]}>
      {courses.map((course) => (
        <Col key={course.id} xs={24} sm={12} md={8} lg={6}>
          <CourseCard course={course} />
        </Col>
      ))}
    </Row>
  );
}
