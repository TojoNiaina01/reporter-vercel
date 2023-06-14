/** @type {import('next').NextConfig} */
// const withImages = require('next-images')


// module.exports = withImages({
//   //reactStrictMode: true,
//   webpack(config, options) {
//     return config
//   }
// })


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

// const withImages = require('next-images');
// const ImageminPlugin = require('imagemin-webpack-plugin').default;

// module.exports = withImages({
//   webpack(config, { isServer }) {
//     if (!isServer) {
//       config.plugins.push(
//         new ImageminPlugin({
//           test: /\.(jpe?g|png|gif|svg)$/i,
//         })
//       );
//     }

//     return config;
//   },
// });
