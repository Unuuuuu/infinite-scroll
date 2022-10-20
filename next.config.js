/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  experimental: {
    esmExternals: false,
  },
  images: {
    domains: ["i.pravatar.cc"],
    minimumCacheTTL: 1,
    unoptimized: true,
  },
};

module.exports = nextConfig;
