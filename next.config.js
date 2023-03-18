/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: ['img.youtube.com', 'yt3.ggpht.com', 'www.pngmart.com'],
  },
}

module.exports = nextConfig
