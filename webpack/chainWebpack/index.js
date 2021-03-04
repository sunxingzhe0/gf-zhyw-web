const path = require("path");
const chalk = require("chalk");

module.exports = (config, options) => {
  config.plugin("html").tap((args) => {
    args[0].title = "智慧后勤";
    return args;
  });

  config.plugin("define").tap((args) => {
    try {
      const argvs = JSON.parse(process.env.npm_config_argv);
      const commands = argvs.original.filter(
        (item) => item.indexOf("=") !== -1
      );
      commands.forEach((item) => {
        item = item.split("=");
        args[0]["process.env"][item[0].replace("--", "")] = item[1];
      });
      return args;
    } catch (e) {
      console.log(chalk.yellowBright("parse commads-line params error:"));
      console.log(chalk.red(e));
      return args;
    }
  });

  // it can improve the speed of the first screen, it is recommended to turn on preload
  config.plugin("preload").tap(() => [
    {
      rel: "preload",
      // to ignore runtime.js
      // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
      fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
      include: "initial",
    },
  ]);
  // when there are many pages, it will cause too many meaningless requests
  config.plugins.delete("prefetch");

  config.when(process.env.NODE_ENV !== "development", (config) => {
    config
      .plugin("ScriptExtHtmlWebpackPlugin")
      .after("html")
      .use("script-ext-html-webpack-plugin", [
        {
          // `runtime` must same as runtimeChunk name. default is `runtime`
          inline: /runtime\..*\.js$/,
        },
      ])
      .end();
    config.optimization.splitChunks({
      chunks: "all",
      cacheGroups: {
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial", // only package third parties that are initially dependent
        },
        elementUI: {
          name: "chunk-elementUI", // split elementUI into a single package
          priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
          test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
        },
        commons: {
          name: "chunk-commons",
          test: path.join(__dirname, "src/components"), // can customize your rules
          minChunks: 3, //  minimum common number
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    });
    // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
    config.optimization.runtimeChunk("single");
  });
};
