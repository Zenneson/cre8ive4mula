/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
  sassOptions: {
    prependData: `@import "./_mantine.scss";`,
  },
};

module.exports = nextConfig;
