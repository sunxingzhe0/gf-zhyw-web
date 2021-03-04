const webpack = require("webpack");

module.exports = new webpack.ProvidePlugin({
  $: "jquery",
  jQuery: "jquery",
  "windows.jQuery": "jquery",
});
