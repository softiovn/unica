"use client";

import { Layout, Typography } from "antd";
import Header from "../Header";
import Footer from "../Footer";
import CourseSearch from "../CourseSearch";
import CoursesContent from "../CoursesContent";

const { Content } = Layout;
const { Title } = Typography;

export default function CoursesPage() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header />
      <Content
        style={{
          padding: "40px 0",
          background: "#f8f9fa",
          minHeight: "calc(100vh - 134px)",
        }}
      >
        <div className="container">
          <div style={{ marginBottom: 32 }}>
            <Title level={1} style={{ textAlign: "center", marginBottom: 8 }}>
              Tất cả khóa học
            </Title>
            <div
              style={{ textAlign: "center", color: "#666", marginBottom: 32 }}
            >
              Khám phá hàng ngàn khóa học chất lượng
            </div>
            <CourseSearch />
          </div>
          <CoursesContent />
        </div>
      </Content>
      <Footer />
    </Layout>
  );
}
