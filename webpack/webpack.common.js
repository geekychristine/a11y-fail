const Path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  entry: {
    app: Path.resolve(__dirname, "../src/scripts/index.js")
  },
  output: {
    publicPath: isProd ? "/a11y-fail" : "/",
    path: Path.join(__dirname, "../public"),
    filename: "js/[name].js"
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      name: false
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, "../src/index.html")
    }),
    new CopyPlugin({
      patterns: [{ from: "src/img", to: "img" }]
    })
  ],
  resolve: {
    modules: ["node_modules", "src"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          {
            loader: "eslint-loader",
            options: {
              fix: true
            }
          }
        ]
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: "file-loader",
          options: {
            outputPath: "img",
            name: "[name].[ext]"
          }
        }
      }
    ]
  }
};
