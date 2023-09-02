const path = require("path");
const webpack = require("webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = (env, argv) => {
  const config = {
    mode: "production",
    entry: ["./src/index.tsx"],
    target: "node",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "index.js",
    },
    module: {
      rules: [
        {
          test: /\.(j|t)sx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: { cacheDirectory: true, cacheCompression: false },
          },
        },
        {
          test: /\.(png|jpe?g|gif|svg|bmp|otf)$/i,
          use: [
            {
              loader: "file-loader",
              options: { publicPath: "dist" },
            },
          ],
        },
        {
          test: /\.node/i,
          use: [
            {
              loader: "native-addon-loader",
              options: { name: "[name]-[hash].[ext]" },
            },
          ],
        },
      ],
    },
    plugins: [new CleanWebpackPlugin()],
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx", ".json"],
      alias: {
        "@components": path.resolve(__dirname, "src/components"),
        "@helpers": path.resolve(__dirname, "src/helpers"),
        "@lcu": path.resolve(__dirname, "src/LCU"),
        "@assets": path.resolve(__dirname, "assets"),
        "@globals": path.resolve(__dirname, "src/globals"),
      },
    },
  };

  if (argv.mode === "development") {
    config.mode = "development";
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.plugins.push(new ForkTsCheckerWebpackPlugin());
    config.devtool = "source-map";
    config.watch = true;
    config.entry.unshift("webpack/hot/poll?100");
  }
  // if (argv.isServer) {
  //   config.externals = [nodeExternals()];
  // }
  return config;
};
