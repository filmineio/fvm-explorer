/** @type {import("next").NextConfig} */
const { i18n } = require("./next-i18next.config");
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  experimental: { images: { layoutRaw: true } },
  images: {
    domains: ["127.0.0.1", "localhost"],
  },
};

module.exports = {
  nextConfig,
  i18n,
  webpack: (config, { isServer }) => {
    const api = path.join(__dirname, "src/api");
    // Add TypeScript support for the API directory
    if (isServer) {
      config.resolve.alias["~"] = api;
    }

    // Add TypeScript support for the UI directory
    if (!isServer) {
      config.resolve.alias["~"] = path.join(__dirname, "src/ui");
    }

    return config;
  },
};
