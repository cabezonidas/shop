const path = require("path");
const nodeExternals = require("webpack-node-externals");
module.exports = {
  entry: "./lambda.ts",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".mjs", ".js"],
  },
  output: {
    filename: "lambda.js",
    path: path.resolve(__dirname, "lib"),
  },
  externals: [nodeExternals()],
};
