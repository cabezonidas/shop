const path = require("path");
const nodeExternals = require("webpack-node-externals");
const { NODE_ENV = "production" } = process.env;
module.exports = {
  entry: "./lambda.ts",
  devtool: "inline-source-map",
  mode: NODE_ENV,
  target: "node",
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "lambda.js",
  },
  resolve: {
    extensions: [".ts", ".mjs", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  externals: [nodeExternals()],
};
