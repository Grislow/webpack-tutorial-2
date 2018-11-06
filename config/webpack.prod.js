const path = require("path")
const webpack = require("webpack")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const UglifyPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    main: ["./src/main.js"]
  },
  mode: "production",
  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader
          },
          {
            loader: "css-loader",
            // Not optimal, only removes whitespace
            // options: {
            //   minimize: true
            // }
          }
        ]
      },
      {
        test: /\.jpg$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new OptimizeCSSAssetsPlugin(),
    new MiniCSSExtractPlugin({
      filename: "[name]-[contenthash].css"
    }),
    new HTMLWebpackPlugin({
      template: "./src/index.ejs",
      inject: true,
      title: "Link's Journal"
    }),
    new webpack.DefinePlugin({
      //allows defining variables as though they where on the process object, below is unnecessary, take NODE_ENV from 'mode' field
      // "process.env": {
      //   NODE_ENV: JSON.stringify("production")
      // }
    }),
    // new MinifyPlugin()
    new UglifyPlugin()
  ]
}
