const path = require("path");
const UglifyWebpackPlugin = require("uglifyjs-webpack-plugin");

const dev = process.env.NODE_ENV === "dev";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const getLoader = (loader) => require(`./assets/loaders/${loader}Loader`)(dev);
const HTMLWebpackPlugin = require("html-webpack-plugin");

const cssLoader = getLoader("css");

const config = {
  mode: "none",
  entry: {
    app: "./assets/js/app",
    vendor: "./assets/js/vendor",
  },
  devtool: dev ? "cheap-module-eval-source-map" : "source-map",
  watch: dev,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: dev ? "[name].bundle.js" : "[name].[hash].js",
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["eslint-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: cssLoader,
      },
      {
        test: /\.s[ac]ss$/,
        exclude: /node_modules/,
        use: [...cssLoader, "sass-loader"],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./template.html",
    }),
  ],
};

// i.e production
if (!dev) {
  config.plugins.push(
    new UglifyWebpackPlugin({
      sourceMap: true,
    }),
    new MiniCssExtractPlugin({ filename: "[name].[hash].css" })
  );
}

module.exports = config;
