const path = require("path");

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
    symlinks: true,
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
};
