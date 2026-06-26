import type { NextConfig } from "next";

const strapiUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
const strapiHostname = strapiUrl ? new URL(strapiUrl).hostname : '';
const isLocalStrapi = ['localhost', '127.0.0.1', '::1'].includes(strapiHostname);
const strapiMediaPattern = (() => {
  if (!strapiUrl) {
    return null;
  }

  const url = new URL(strapiUrl);

  return {
    protocol: url.protocol.replace(':', '') as 'http' | 'https',
    hostname: url.hostname,
    port: url.port,
    pathname: '/uploads/**',
  };
})();

const strapiRemotePatterns: NonNullable<NextConfig['images']>['remotePatterns'] = [
  {
    protocol: 'http',
    hostname: 'localhost',
    port: '1337',
    pathname: '/uploads/**',
  },
  {
    protocol: 'http',
    hostname: '127.0.0.1',
    port: '1337',
    pathname: '/uploads/**',
  },
];

if (
  strapiMediaPattern
  && !strapiRemotePatterns.some((pattern) => (
    !(pattern instanceof URL)
    && pattern.protocol === strapiMediaPattern.protocol
    && pattern.hostname === strapiMediaPattern.hostname
    && pattern.port === strapiMediaPattern.port
  ))
) {
  strapiRemotePatterns.push(strapiMediaPattern);
}

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: strapiRemotePatterns,
    dangerouslyAllowLocalIP: isLocalStrapi,
  },
};

export default nextConfig;
