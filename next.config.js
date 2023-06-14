/** @type {import('next').NextConfig} */
// const withImages = require('next-images')

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://indep-reporter.com/:path*',
        permanent: true,
      },
    ];
  },
 
};

module.exports = nextConfig;
