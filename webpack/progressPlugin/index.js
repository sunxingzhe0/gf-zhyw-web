const webpack = require("webpack");
const Meta = require("./Meta");
const Doc = require("./Doc");
let metaError = null;

module.exports = new webpack.ProgressPlugin({
  handler(percentage, message, ...args) {
    if (percentage === 0) {
      metaError = null;
      try {
        Doc.gen();
        Meta.gen();
      } catch (e) {
        metaError = e;
      }
    }
    if (message === "after emitting" && args[0] === "CopyPlugin") {
      if (metaError) {
        console.error("\nbuilding failed:===============================!");
        console.log("Error Msg:\n");
        console.log(metaError);
      } else {
        console.log(
          "\n\x1B[32mbuilding success:==============================!\x1B[0m"
        );
      }
    }
  },
});
