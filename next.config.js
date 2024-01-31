/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: [
      "@mantine/core",
      "@mantine/hooks",
      "@dotlottie/react-player",
      "framer-motion",
      "@react-three/drei",
      "@react-three-fiber",
      "@react-spring/three",
      "three",
    ],
  },
  sassOptions: {
    prependData: `@import "./_mantine.scss";`,
  },
};

module.exports = nextConfig;
