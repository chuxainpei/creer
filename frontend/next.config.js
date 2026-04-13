/** @type {import('next').NextConfig} */
const schoolDomain = process.env.SCHOOL_DOMAIN;
const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === '1';
const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() || '';
const normalizedBasePath =
  configuredBasePath && configuredBasePath !== '/'
    ? configuredBasePath.startsWith('/')
      ? configuredBasePath
      : `/${configuredBasePath}`
    : '';

const frameAncestors = schoolDomain
  ? `frame-ancestors 'self' https://${schoolDomain}`
  : "frame-ancestors 'self' https://*.edu.cn";

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: frameAncestors,
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
];

const nextConfig = isDemoMode
  ? {
      output: 'export',
      images: { unoptimized: true },
      trailingSlash: true,
      basePath: normalizedBasePath,
      assetPrefix: normalizedBasePath || undefined,
    }
  : {
      async headers() {
        return [
          {
            source: '/:path*',
            headers: securityHeaders,
          },
        ];
      },
    };

module.exports = nextConfig;
