/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
    domains: ['taxmate.pages.dev', 'images.unsplash.com'],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'taxmate.pages.dev'],
    },
  },
  // Disable server-side features since we're doing static export
  trailingSlash: true,
  // Configure API proxy for Cloudflare Worker
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://taxmate-api.uservatsal.workers.dev/:path*',
      },
    ]
  },
}

module.exports = nextConfig 