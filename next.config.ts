import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // ここを追加して画像最適化を無効にする
  },
};

export default nextConfig;
