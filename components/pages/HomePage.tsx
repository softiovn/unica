"use client";

import { Layout } from "antd";
import Header from "../Header";
import Footer from "../Footer";
import HeroSection from "../HeroSection";
import CourseSection from "../CourseSection";
import CategorySection from "../CategorySection";
import AuthTest from "../AuthTest";

const { Content } = Layout;

export default function HomePage() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header />
      <Content>
        <HeroSection />
        <div className="container">
          <AuthTest />
        </div>
        <CategorySection />
        <CourseSection title="Khóa học nổi bật" type="featured" />
        <CourseSection title="Khóa học mới nhất" type="new" />
        <CourseSection title="Khóa học bán chạy" type="best-seller" />
      </Content>
      <Footer />
    </Layout>
  );
}
