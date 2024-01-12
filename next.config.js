/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'ja', 'vi'],
    defaultLocale: 'ja',
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
