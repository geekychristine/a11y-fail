const Path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: Path.resolve(__dirname, "../src/scripts/index.js")
  },
  output: {
    publicPath: "/",
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
