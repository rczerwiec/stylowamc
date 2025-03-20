/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['minotar.net',"starlightskins.lunareclipse.studio","minecraft-api.vercel.app"],
  },
}

module.exports = nextConfig 