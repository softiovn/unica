"use client";

import { Typography, Button, Space } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { unicaApi } from "@/utils/api";
import CourseGrid from "./CourseGrid";
import Link from "next/link";

const { Title } = Typography;

interface CourseSectionProps {
  title: string;
  type: "featured" | "new" | "best-seller" | "popular";
  limit?: number;
}

import { Course } from "@/utils/api";

async function CourseContent({ type, limit }: { type: string; limit: number }) {
  let courses: Course[] = [];

  try {
    switch (type) {
      case "featured":
        courses = await unicaApi.getFeaturedCourses(limit);
        break;
      case "new":
        courses = await unicaApi.getNewCourses(limit);
        break;
      case "best-seller":
        courses = await unicaApi.getBestSellerCourses(limit);
        break;
      case "popular":
        courses = await unicaApi.getPopularCourses(limit);
        break;
      default:
        courses = await unicaApi.getFeaturedCourses(limit);
    }
  } catch (error) {
    console.error(`Error loading ${type} courses:`, error);
    courses = [];
  }

  return <CourseGrid courses={courses} />;
}

export default function CourseSection({
  title,
  type,
  limit = 8,
}: CourseSectionProps) {
  return (
    <section style={{ padding: "60px 0", background: "#fff" }}>
      <div className="container">
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Title level={2} style={{ margin: 0 }}>
              {title}
            </Title>
            <Link href="/courses">
              <Button type="link" size="large">
                Xem tất cả <ArrowRightOutlined />
              </Button>
            </Link>
          </div>
          <CourseContent type={type} limit={limit} />
        </Space>
      </div>
    </section>
  );
}
