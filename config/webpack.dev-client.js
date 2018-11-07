const path = require("path")
const webpack = require("webpack")
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const HTMLWebpackPlugin = require("html-webpack-plugin")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

module.exports = {
  //informs webpack that this is a build for client side
  name: "client",
  entry: {
    vendor: ["react", "react-dom"],
    main: [
      "babel-runtime/regenerator",
      "webpack-hot-middleware/client?reload=true",
      "./src/main.js"
    ]
  },
  output: {
    filename: "[name]-bundle.js",
    chunkFilename: "[name].js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/"
  },
  mode: "development",
  //tells webpack to run in the browser
  target: "web",
  devServer: {
    contentBase: "dist",
    overlay: true,
    stats: {
      colors: true
    }
  },
  devtool: "source-map",
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
            loader: "css-loader"
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
            loader: "file-loader",
            options: {
              name: "[name].[ext]"
            }
          },
          { loader: "extract-loader" },
          {
            loader: "html-loader",
            options: {
              attrs: ["img:src"]
            }
          }
        ]
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: "markdown-with-front-matter-loader"  
          }

          // THIS WOULD BE OK WITH MD THAT DOESNT USE VARIABLES
          // {
          //   loader: "html-loader"
          // },
          // {
          //   loader: "markdown-loader"
          // }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCSSExtractPlugin({
      filename: "main.css"
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
        WEBPACK: true
      }
    }),
    //  THIS IS NOT USED SINCE WE ARE RENDERING SERVER SIDE
    // new HTMLWebpackPlugin({
    //   template: "./src/index.ejs",
    //   inject: true,
    //   title: "Link's Journal"
    // }),
    //  COMMENTING OUT BECAUSE ITS ANNOYING
    // new BundleAnalyzerPlugin({
    //   //generates stats.json in dist that is used by the bundle analyzer
    //   generateStatsFile: true
    // })
  ]
}
