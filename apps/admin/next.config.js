const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

/** @type {import('next').NextConfig} */
const nextConfig = (phase, { defaultConfig }) => {
  const commonConfig = {
    transpilePackages: ['@hydra-ipxe/*'],
  };

  // For development, proxy requests to the API server
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      ...defaultConfig,
      ...commonConfig,
      async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'http://localhost:8000/api/:path*',
          },
        ];
      },
    };
  }

  return {
    ...defaultConfig,
    ...commonConfig,
  };
};

module.exports = nextConfig;
