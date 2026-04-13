/** @type {import('next').NextConfig} */
const schoolDomain = process.env.SCHOOL_DOMAIN;

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

const nextConfig = {
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
