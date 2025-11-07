import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Unica - Học trực tuyến cùng chuyên gia",
  description:
    "Khám phá hàng ngàn khóa học chất lượng cao từ các chuyên gia hàng đầu tại Unica",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#ff6b00",
                borderRadius: 8,
              },
            }}
          >
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
