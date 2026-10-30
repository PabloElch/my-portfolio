import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/portfolio',
  assetPrefix: '/portfolio/', // Ensures assets load from the correct subfolder
  trailingSlash: true,        // Prevents 404s on directory-based routes
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
