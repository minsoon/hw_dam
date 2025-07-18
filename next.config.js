/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.iconify.design',
      },
      {
        protocol: 'https',
        hostname: 'hanwhastorage.blob.core.windows.net',
      },
      {
        protocol: 'https',
        hostname: 'hvsgmpdevstorage.blob.core.windows.net',
      },
    ],
  },
  reactStrictMode: false,
  swcMinify: true,
}

module.exports = nextConfig
