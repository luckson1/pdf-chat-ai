/** @type {import('next').NextConfig} */
import nodeExternals from "webpack-node-externals"
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com']
  },
  swcMinify: true,
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true,  externals: [nodeExternals()], };
    return config;
  },
};

export default nextConfig;
