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
});
