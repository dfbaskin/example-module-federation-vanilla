const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

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
    extensions: [".ts", ".tsx", ".css"],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["css-loader"],
      },
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react", "@babel/preset-typescript"],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "interop-app",
      filename: "remoteEntry.js",
      exposes: {},
      shared: ["react", "react-dom"],
    }),
    new HtmlWebpackPlugin({
      template: "./interop-app/src/index.html",
    }),
    new CopyPlugin({
      patterns: [{ from: "./interop-app/src/favicon.ico", to: outputPath }],
    }),
  ],
};
