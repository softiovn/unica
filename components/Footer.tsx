"use client";

import { Layout, Row, Col, Typography, Space } from "antd";
import {
  FacebookOutlined,
  YoutubeOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from "@ant-design/icons";

const { Footer: AntFooter } = Layout;
const { Text, Link, Title } = Typography;

export default function Footer() {
  return (
    <AntFooter
      style={{
        background: "#001529",
        color: "white",
        padding: "48px 20px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={12} md={6}>
            <Title level={4} style={{ color: "white", marginBottom: 16 }}>
              VỀ UNICA
            </Title>
            <Space direction="vertical" size="small">
              <Link href="#" color="rgba(255,255,255,0.8)">
                Giới thiệu
              </Link>
              <Link href="#" color="rgba(255,255,255,0.8)">
                Cơ hội việc làm
              </Link>
              <Link href="#" color="rgba(255,255,255,0.8)">
                Điều khoản sử dụng
              </Link>
            </Space>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Title level={4} style={{ color: "white", marginBottom: 16 }}>
              DANH MỤC
            </Title>
            <Space direction="vertical" size="small">
              <Link href="#" color="rgba(255,255,255,0.8)">
                Công nghệ thông tin
              </Link>
              <Link href="#" color="rgba(255,255,255,0.8)">
                Marketing
              </Link>
              <Link href="#" color="rgba(255,255,255,0.8)">
                Thiết kế đồ họa
              </Link>
            </Space>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Title level={4} style={{ color: "white", marginBottom: 16 }}>
              HỖ TRỢ
            </Title>
            <Space direction="vertical" size="small">
              <Link href="#" color="rgba(255,255,255,0.8)">
                Trung tâm trợ giúp
              </Link>
              <Link href="#" color="rgba(255,255,255,0.8)">
                Hướng dẫn mua khóa học
              </Link>
              <Link href="#" color="rgba(255,255,255,0.8)">
                Liên hệ
              </Link>
            </Space>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Title level={4} style={{ color: "white", marginBottom: 16 }}>
              KẾT NỐI
            </Title>
            <Space size="middle" style={{ marginBottom: 16 }}>
              <FacebookOutlined
                style={{ fontSize: "24px", color: "#fff", cursor: "pointer" }}
              />
              <YoutubeOutlined
                style={{ fontSize: "24px", color: "#fff", cursor: "pointer" }}
              />
              <TwitterOutlined
                style={{ fontSize: "24px", color: "#fff", cursor: "pointer" }}
              />
              <InstagramOutlined
                style={{ fontSize: "24px", color: "#fff", cursor: "pointer" }}
              />
            </Space>
            <Text style={{ color: "rgba(255,255,255,0.8)" }}>
              Email: support@unica.vn
              <br />
              Hotline: 1900 636 099
            </Text>
          </Col>
        </Row>

        <Row
          style={{
            marginTop: 32,
            paddingTop: 32,
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Col span={24} style={{ textAlign: "center" }}>
            <Text style={{ color: "rgba(255,255,255,0.6)" }}>
              © 2024 Unica. Tất cả các quyền được bảo lưu.
            </Text>
          </Col>
        </Row>
      </div>
    </AntFooter>
  );
}
