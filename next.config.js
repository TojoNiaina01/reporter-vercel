/** @type {import('next').NextConfig} */
// const withImages = require('next-images')

const nextConfig = {
  reactStrictMode: true,
  images: {
      domains: ['localhost']
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "header",
            key: "x-forwarded-proto",
            value: "http",
          },
        ],
        destination: "https://localhost:3000/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
