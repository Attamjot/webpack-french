const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const cssLoader = dev => {
  return [
    dev ? "style-loader" : MiniCssExtractPlugin.loader,
    {
      loader: "css-loader",
      options: {
        importLoaders: 1
      }
    },
    {
      loader: "postcss-loader",
      options: {
        plugins: loader => [
          require("autoprefixer")({
            browsers: ["last 2 versions", "ie > 8"]
          })
        ]
      }
    }
  ];
};

module.exports = cssLoader;
