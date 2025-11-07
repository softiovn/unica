"use client";

import { Layout, Menu, Input, Button, Dropdown, Space } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import type { MenuProps } from "antd";

const { Header: AntHeader } = Layout;
const { Search } = Input;

export default function Header() {
  const router = useRouter();

  const categories: MenuProps["items"] = [
    {
      key: "1",
      label: "Công nghệ thông tin",
      onClick: () => router.push("/categories/1"),
    },
    {
      key: "2",
      label: "Marketing",
      onClick: () => router.push("/categories/2"),
    },
    {
      key: "3",
      label: "Thiết kế đồ họa",
      onClick: () => router.push("/categories/3"),
    },
    {
      key: "4",
      label: "Ngoại ngữ",
      onClick: () => router.push("/categories/4"),
    },
  ];

  const menuItems = [
    {
      key: "home",
      label: "Trang chủ",
      onClick: () => router.push("/"),
    },
    {
      key: "courses",
      label: "Khóa học",
      onClick: () => router.push("/courses"),
    },
    {
      key: "categories",
      label: (
        <Space>
          Danh mục
          <CaretDownOutlined />
        </Space>
      ),
      children: categories,
    },
  ];

  const userMenuItems: MenuProps["items"] = [
    {
      key: "login",
      label: "Đăng nhập",
      icon: <UserOutlined />,
    },
    {
      key: "register",
      label: "Đăng ký",
    },
  ];

  const onSearch = (value: string) => {
    if (value.trim()) {
      router.push(`/search?q=${encodeURIComponent(value)}`);
    }
  };

  return (
    <AntHeader
      style={{
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        padding: "0 20px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          maxWidth: 1200,
          margin: "0 auto",
          height: "100%",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#ff6b00",
            marginRight: "40px",
            cursor: "pointer",
          }}
          onClick={() => router.push("/")}
        >
          UNICA
        </div>

        <Menu
          mode="horizontal"
          items={menuItems}
          style={{
            flex: 1,
            border: "none",
            background: "transparent",
          }}
        />

        <div style={{ marginRight: "20px", width: 300 }}>
          <Search
            placeholder="Tìm kiếm khóa học..."
            enterButton={<SearchOutlined />}
            size="middle"
            onSearch={onSearch}
          />
        </div>

        <Space size="middle">
          <Button
            type="text"
            icon={<ShoppingCartOutlined />}
            style={{ color: "#666" }}
          >
            Giỏ hàng
          </Button>

          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Button type="text" icon={<UserOutlined />}>
              Tài khoản
            </Button>
          </Dropdown>
        </Space>
      </div>
    </AntHeader>
  );
}
