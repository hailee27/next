/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['react-square-web-payments-sdk']);

module.exports = withTM({
  reactStrictMode: false,
  output: 'standalone',
  experimental: {
    esmExternals: 'loose',
  },
  images: {
    deviceSizes: [375, 640, 768, 1024, 1280, 1536],
    domains: ['api.staging.clout-fi.com', 'api.test-internal-clout.lisod.vn', 'localhost'],
    minimumCacheTTL: 60,
  },
});
