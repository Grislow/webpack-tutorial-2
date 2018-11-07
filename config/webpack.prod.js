const path = require("path")
const webpack = require("webpack")
const MiniCSSExtractPlugin = require("mini-css-extract-plugin")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const BrotliPlugin = require("brotli-webpack-plugin")

module.exports = env => {
  return {
    entry: {
      vendor: ["react", "react-dom"],
      main: ["./src/main.js"]
    },
    output: {
      filename: "[name]-bundle.js",
      path: path.resolve(__dirname, "../dist"),
      publicPath: "/"
    },
    target: "web",
    mode: "production",
    optimization: {
      splitChunks: {
        automaticNameDelimiter: "_",
        cacheGroups: {
          vendor: {
            name: "vendor",
            test: /[\\/]node_modules[\\/]/,
            chunks: "initial",
            minChunks: 2
          }
        }
      }
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
            { loader: MiniCSSExtractPlugin.loader },
            {
              loader: "css-loader",
              options: {
                minimize: true
              }
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
      new MiniCSSExtractPlugin(),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require("cssnano"),
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: true
      }),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(env.NODE_ENV)
        }
      }),
      // new HTMLWebpackPlugin({
      //   template: "./src/index.ejs",
      //   inject: true,
      //   title: "Link's Journal",
      //   chunks: ["vendor", "main"]
      // }),
      new UglifyJSPlugin(),
      new CompressionPlugin({
        algorithm: "gzip"
      }),
      new BrotliPlugin()
    ]
  }
}
