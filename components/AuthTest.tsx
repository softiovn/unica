import { Alert, Card, Typography, Space, Tag } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { unicaApi } from "@/utils/api";

const { Title, Text } = Typography;

export default async function AuthTest() {
  let isAuthenticated = false;
  let errorMessage = "";

  try {
    isAuthenticated = await unicaApi.testAuthentication();
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Unknown error";
  }

  if (isAuthenticated) {
    return (
      <Card style={{ marginBottom: 24 }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Space>
            <CheckCircleOutlined
              style={{ color: "#52c41a", fontSize: "16px" }}
            />
            <Title level={5} style={{ margin: 0, color: "#52c41a" }}>
              Kết nối API thành công
            </Title>
          </Space>
          <Text type="secondary">Đã kết nối thành công với Unica API.</Text>
        </Space>
      </Card>
    );
  }

  return (
    <Alert
      message="Lỗi kết nối API"
      description={
        <Space direction="vertical">
          <Text>Không thể kết nối đến Unica API.</Text>
          {errorMessage && <Tag color="red">Lỗi: {errorMessage}</Tag>}
        </Space>
      }
      type="error"
      showIcon
      style={{ marginBottom: 24 }}
    />
  );
}
