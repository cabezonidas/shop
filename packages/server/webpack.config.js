const path = require("path");
const nodeExternals = require("webpack-node-externals");
module.exports = {
  entry: "./lambda.ts",
  mode: "production",
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
        use: [
          {
            loader: "ts-loader",
            options: {
              happyPackMode: true,
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  externals: [nodeExternals()],
};
