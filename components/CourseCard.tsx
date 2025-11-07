"use client";

import { Card, Rate, Tag, Space, Button } from "antd";
import {
  UserOutlined,
  PlayCircleOutlined,
  ClockCircleOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import type { Course } from "@/utils/api";
import Image from "next/image";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const router = useRouter();
  const finalPrice = course.discount_price || course.price;
  const hasDiscount =
    course.discount_price && course.discount_price < course.price;
  const discountPercent = hasDiscount
    ? Math.round(((course.price - course.discount_price!) / course.price) * 100)
    : 0;

  const handleViewDetail = () => {
    router.push(`/course/${course.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Add to cart:", course.id);
  };

  return (
    <Card
      hoverable
      className="course-card"
      cover={
        <div style={{ position: "relative", height: 200 }}>
          <Image
            alt={course.title}
            src={course.image}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          {hasDiscount && (
            <div
              className="discount-badge"
              style={{ position: "absolute", top: 8, right: 8 }}
            >
              -{discountPercent}%
            </div>
          )}
          {course.is_hot && (
            <Tag color="red" style={{ position: "absolute", top: 8, left: 8 }}>
              Hot
            </Tag>
          )}
        </div>
      }
      bodyStyle={{ padding: "16px" }}
      onClick={handleViewDetail}
    >
      <Space direction="vertical" size={12} style={{ width: "100%" }}>
        <div>
          <h4
            style={{
              margin: 0,
              fontSize: "16px",
              lineHeight: 1.4,
              height: "44px",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {course.title}
          </h4>

          <p style={{ color: "#666", fontSize: "12px", margin: "4px 0 0 0" }}>
            {course.instructor}
          </p>
        </div>

        <Space size="small">
          <Rate
            disabled
            defaultValue={course.rating}
            style={{ fontSize: "14px" }}
          />
          <span style={{ color: "#ffa940", fontSize: "14px", fontWeight: 600 }}>
            {course.rating}
          </span>
        </Space>

        <Space size="small" style={{ fontSize: "12px", color: "#666" }}>
          <Space size="small">
            <UserOutlined />
            <span>{course.students_count.toLocaleString()}</span>
          </Space>
          <Space size="small">
            <PlayCircleOutlined />
            <span>{course.total_lessons} bài</span>
          </Space>
          <Space size="small">
            <ClockCircleOutlined />
            <span>{course.total_time}</span>
          </Space>
        </Space>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            {hasDiscount && (
              <span
                className="price-original"
                style={{ fontSize: "12px", marginRight: 8 }}
              >
                {course.price.toLocaleString()}₫
              </span>
            )}
            <span className="price-final" style={{ fontSize: "16px" }}>
              {finalPrice.toLocaleString()}₫
            </span>
          </div>

          <Button
            type="primary"
            size="middle"
            icon={<ShoppingCartOutlined />}
            onClick={handleAddToCart}
          >
            Thêm
          </Button>
        </div>
      </Space>
    </Card>
  );
}
