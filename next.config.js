/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  optimizeFonts: false,
  images: {
    domains: ['cdn.discordapp.com'],
  },
  env: {
    "HCAPTCHA_PUBLIC_SITE_KEY": process.env.HCAPTCHA_PUBLIC_SITE_KEY
  }
}

module.exports = nextConfig
