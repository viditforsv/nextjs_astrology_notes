/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    // Provide process polyfill for client-side to fix "process is not defined" error
    config.plugins.push(
      new webpack.ProvidePlugin({
        process: 'process/browser',
      })
    );
    
    return config;
  },
};

module.exports = nextConfig;
