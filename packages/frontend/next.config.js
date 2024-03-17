// @ts-check

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

/** @type {import('next').NextConfig} */
const nextConfig = (phase, { defaultConfig }) => {
  return {
    reactStrictMode: true,
    ...(phase === PHASE_DEVELOPMENT_SERVER && {
      async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'http://localhost:4007/api/:path*',
          },
        ];
      },
    }),
  };
};

// export default nextConfig;
module.exports = nextConfig;
