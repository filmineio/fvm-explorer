/** @type {import("next").NextConfig} */
const { i18n } = require("./next-i18next.config");
const path = require("path");

const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const withTM = require("next-transpile-modules")([
  // `monaco-editor` isn't published to npm correctly: it includes both CSS
  // imports and non-Node friendly syntax, so it needs to be compiled.
  "monaco-editor",
]);

const nextConfig = {
  reactStrictMode: true,
  experimental: { images: { layoutRaw: true } },
  images: {
    domains: ["127.0.0.1", "localhost"],
  },
};

module.exports = withTM({
  nextConfig,
  i18n,
  webpack: (config, { isServer }) => {
    const api = path.join(__dirname, "src/api");
    // Add TypeScript support for the API directory
    if (isServer) {
      config.resolve.alias["~"] = api;
    }

    // Add TypeScript support for the UI directory

    const rule = config.module.rules
      .find((rule) => rule.oneOf)
      .oneOf.find(
        (r) =>
          // Find the global CSS loader
          r.issuer && r.issuer.include && r.issuer.include.includes("_app")
      );
    if (rule) {
      rule.issuer.include = [
        rule.issuer.include,
        // Allow `monaco-editor` to import global CSS:
        /[\\/]node_modules[\\/]monaco-editor[\\/]/,
      ];
    }

    if (!isServer) {
      config.resolve.alias["~"] = path.join(__dirname, "src/ui");
      config.plugins.push(
        new MonacoWebpackPlugin({
          languages: ["json", "solidity"],
          filename: "static/[name].worker.js",
        })
      );
    }

    return config;
  },
});
