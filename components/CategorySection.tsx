import { Row, Col, Card, Typography } from "antd";
import { unicaApi } from "@/utils/api";
import Link from "next/link";

const { Title } = Typography;

const categoryIcons = ["💻", "📱", "🎨", "📊", "🌐", "📈", "🎵", "🎬"];

interface Category {
  id: number | string;
  name: string;
  course_count?: number;
}

export default async function CategorySection() {
  let categories: Category[] = [];

  try {
    categories = await unicaApi.getCategories();
  } catch (error) {
    console.error("Error loading categories:", error);
    categories = [];
  }

  if (categories.length === 0) {
    return null;
  }

  return (
    <section style={{ padding: "60px 0", background: "#f8f9fa" }}>
      <div className="container">
        <Title level={2} style={{ textAlign: "center", marginBottom: 40 }}>
          Khám phá theo danh mục
        </Title>

        <Row gutter={[16, 16]}>
          {categories.slice(0, 8).map((category, index) => (
            <Col xs={12} sm={8} md={6} key={category.id}>
              <Link href={`/categories/${category.id}`}>
                <Card
                  hoverable
                  style={{
                    textAlign: "center",
                    height: "120px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontSize: "32px", marginBottom: 8 }}>
                    {categoryIcons[index] || "📚"}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>
                      {category.name}
                    </div>
                    <div style={{ fontSize: "12px", color: "#666" }}>
                      {category.course_count || 0} khóa học
                    </div>
                  </div>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}
