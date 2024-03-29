import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

// Ensure that the environment variables are loaded before anything else
import './src/env.mjs';

const withBundleAnalyzer = (await import('@next/bundle-analyzer')).default({
  enabled: true,
  openAnalyzer: false,
});

/** @type {import('next').NextConfig} */
const nextConfig = (phase, { defaultConfig }) => {
  const commonConfig = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/dashboard',
          permanent: true,
        },
      ];
    },
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

  return withBundleAnalyzer({
    ...defaultConfig,
    ...commonConfig,
  });
};

export default nextConfig;
