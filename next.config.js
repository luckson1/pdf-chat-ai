/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com']
  },
  swcMinify: true,
  webpack(config, {webpack}) {
    config.experiments = { ...config.experiments, topLevelAwait: true, };
    config.externals.push({
      sharp: "commonjs sharp",
      canvas: "commonjs canvas",
      })
      config.plugins.push(
      new webpack.ProvidePlugin({
      // Buffer: ["buffer", "Buffer"],
      // process: "process/browser",
      })
      )
    // config.module.rules.push({
    //       test: /\.node/,
    //      use: 'raw-loader',
    //     });
      return config;
  },
};

export default nextConfig;
