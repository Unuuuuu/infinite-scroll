/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  experimental: {
    esmExternals: false,
  },
  images: {
    domains: ["picsum.photos"],
  },
};

module.exports = nextConfig;
