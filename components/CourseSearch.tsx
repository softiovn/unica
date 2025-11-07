"use client";

import { useState } from "react";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Search } = Input;

export default function CourseSearch() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value: string) => {
    if (!value.trim()) return;
    router.push(`/search?q=${encodeURIComponent(value)}`);
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <Search
        placeholder="Tìm kiếm khóa học..."
        enterButton={
          <Button type="primary" icon={<SearchOutlined />}>
            Tìm kiếm
          </Button>
        }
        size="large"
        onSearch={handleSearch}
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
    </div>
  );
}
