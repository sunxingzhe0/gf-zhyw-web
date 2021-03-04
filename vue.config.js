const devServer = require("./webpack/devServer");
const chainWebpack = require("./webpack/chainWebpack");
const providePlugin = require("./webpack/providePlugin");
const progressPlugin = require("./webpack/progressPlugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
module.exports = {
  devServer,
  configureWebpack: {
    plugins: [providePlugin, progressPlugin],
  },
  chainWebpack(config) {
    chainWebpack(config);
  },
  productionSourceMap: process.env.NODE_ENV === "development",
};
