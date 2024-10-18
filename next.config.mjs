/** @type {import('next').NextConfig} */
const nextConfig = {
    // Add this line to enable SVG handling
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
      return config;
    },
  };
  
  export default nextConfig;
  