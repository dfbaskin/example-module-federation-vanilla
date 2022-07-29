const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

const deps = require("../package.json").dependencies;

const outputPath = path.join(__dirname, "../dist/interop-app");

module.exports = {
  entry: "./interop-app/src/main",
  mode: "development",
  devServer: {
    static: {
      directory: outputPath,
    },
    port: 4201,
  },
  output: {
    path: outputPath,
    publicPath: "auto",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".css", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: [
            ["@babel/preset-react", { runtime: "automatic" }],
            "@babel/preset-typescript",
          ],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "interop_app",
      filename: "remoteEntry.js",
      exposes: {
        ".": "./interop-app/src/main.tsx",
      },
    }),
    new HtmlWebpackPlugin({
      template: "./interop-app/src/index.html",
    }),
    new CopyPlugin({
      patterns: [{ from: "./interop-app/src/favicon.ico", to: outputPath }],
    }),
  ],
};
