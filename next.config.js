/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com']
  },
  swcMinify: true,
  webpack(config, { isServer }) {
    config.resolve.fallback = {
      fs: false,
      path: false,
      http: false,
      https: false,
      tls: false,
      net: false,
      stream: false,


  }
    config.experiments = { ...config.experiments, topLevelAwait: true, };
    return config;
  },
};

export default nextConfig;
