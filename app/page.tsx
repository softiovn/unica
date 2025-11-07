import HomePage from "@/components/pages/HomePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unica - Học trực tuyến cùng chuyên gia",
  description:
    "Khám phá hàng ngàn khóa học chất lượng cao từ các chuyên gia hàng đầu tại Unica",
};

export default function Home() {
  return <HomePage />;
}
