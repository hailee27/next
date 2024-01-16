/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  images: {
    deviceSizes: [375, 640, 768, 1024, 1280, 1536],
    domains: ['api.staging.clout-fi.com', 'api.test-internal-clout.lisod.vn', 'localhost'],
    minimumCacheTTL: 60,
  },
};

module.exports = nextConfig;
