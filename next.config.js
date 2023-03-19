/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: [
      'img.youtube.com',
      'yt3.ggpht.com',
      'www.pngmart.com',
      'i.imgur.com',
    ],
  },
}

module.exports = nextConfig
