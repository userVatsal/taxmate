/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['taxmate.pages.dev'], // Add your Cloudflare Pages domain
  },
  // Disable server-side features since we're doing static export
  experimental: {
    serverActions: false,
  },
  // Add trailing slashes for better Cloudflare Pages compatibility
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