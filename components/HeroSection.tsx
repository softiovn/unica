"use client";

import { Button, Row, Col, Typography, Space, Statistic } from "antd";
import {
  PlayCircleOutlined,
  StarFilled,
  UserOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Image from "next/image";

const { Title, Paragraph } = Typography;

export default function HeroSection() {
  const router = useRouter();

  return (
    <section
      className="hero-gradient"
      style={{
        color: "white",
        padding: "80px 0",
      }}
    >
      <div className="container">
        <Row gutter={[48, 32]} align="middle">
          <Col xs={24} lg={12}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <div>
                <Title
                  level={1}
                  style={{
                    color: "white",
                    margin: 0,
                    fontSize: "48px",
                    lineHeight: 1.2,
                  }}
                >
                  Học mọi lúc,
                  <br />
                  <span style={{ color: "#ffd666" }}>Thành công mọi nơi</span>
                </Title>
                <Paragraph
                  style={{
                    color: "rgba(255,255,255,0.9)",
                    fontSize: "18px",
                    margin: "16px 0 0 0",
                  }}
                >
                  Khám phá hàng ngàn khóa học chất lượng cao từ các chuyên gia
                  hàng đầu. Nâng cao kỹ năng, phát triển sự nghiệp và đạt được
                  mục tiêu của bạn.
                </Paragraph>
              </div>

              <Space size="middle">
                <Button
                  type="primary"
                  size="large"
                  style={{
                    background: "#ff6b00",
                    borderColor: "#ff6b00",
                    height: "48px",
                    padding: "0 32px",
                    fontSize: "16px",
                    fontWeight: 600,
                  }}
                  onClick={() => router.push("/courses")}
                >
                  Bắt đầu học ngay
                </Button>
                <Button
                  size="large"
                  icon={<PlayCircleOutlined />}
                  style={{
                    background: "transparent",
                    borderColor: "white",
                    color: "white",
                    height: "48px",
                    padding: "0 24px",
                  }}
                >
                  Xem giới thiệu
                </Button>
              </Space>

              <Row gutter={32} style={{ marginTop: "16px" }}>
                <Col>
                  <Statistic
                    value={10000}
                    suffix="+"
                    valueStyle={{ color: "#fff", fontSize: "24px" }}
                    prefix={<StarFilled style={{ color: "#ffd666" }} />}
                    title={
                      <span style={{ color: "rgba(255,255,255,0.8)" }}>
                        Khóa học
                      </span>
                    }
                  />
                </Col>
                <Col>
                  <Statistic
                    value={500000}
                    suffix="+"
                    valueStyle={{ color: "#fff", fontSize: "24px" }}
                    prefix={<UserOutlined style={{ color: "#ffd666" }} />}
                    title={
                      <span style={{ color: "rgba(255,255,255,0.8)" }}>
                        Học viên
                      </span>
                    }
                  />
                </Col>
                <Col>
                  <Statistic
                    value={1000}
                    suffix="+"
                    valueStyle={{ color: "#fff", fontSize: "24px" }}
                    prefix={<StarFilled style={{ color: "#ffd666" }} />}
                    title={
                      <span style={{ color: "rgba(255,255,255,0.8)" }}>
                        Giảng viên
                      </span>
                    }
                  />
                </Col>
              </Row>
            </Space>
          </Col>

          <Col xs={24} lg={12}>
            <div style={{ textAlign: "center" }}>
              <Image
                src="https://placehold.co/600/400"
                alt="Học tập trực tuyến"
                style={{
                  width: "100%",
                  maxWidth: 600,
                  borderRadius: "12px",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                }}
              />
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
}
