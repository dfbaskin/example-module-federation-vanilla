const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

const deps = require("../package.json").dependencies;

const outputPath = path.join(__dirname, "../dist/host-app");

module.exports = {
  entry: "./host-app/src/main",
  mode: "development",
  devServer: {
    static: {
      directory: outputPath,
    },
    port: 4200,
  },
  output: {
    path: outputPath,
    publicPath: "auto",
  },
  resolve: {
    extensions: [".ts", ".css", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["css-loader"],
      },
      {
        test: /\.ts$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-typescript"],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "host-app",
      remotes: {
        interop_app: "interop_app@http://localhost:4201/remoteEntry.js",
      },
    }),
    new HtmlWebpackPlugin({
      template: "./host-app/src/index.html",
    }),
    new CopyPlugin({
      patterns: [{ from: "./host-app/src/favicon.ico", to: outputPath }],
    }),
  ],
};
