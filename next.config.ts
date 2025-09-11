import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // basePath: '/chat', // 静的サイトホスティングでサブディレクトリに配置する場合に使用
};

export default nextConfig;
