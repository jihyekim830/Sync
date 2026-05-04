import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Cloudflare의 압축 기능을 활용하기 위해 Next.js 자체 압축 기능 비활성화
  compress: false,
};

export default nextConfig;
