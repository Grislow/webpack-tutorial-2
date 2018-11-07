const path = require("path")
const webpack = require("webpack")
const MiniCSSExtractPlugin = require("mini-css-extract-plugin")
const nodeExternals = require("webpack-node-externals")

module.exports = env => {
  return {
    entry: {
      server: ["./src/server/main.js"]
    },
    mode: "production",
    output: {
      filename: "[name]-bundle.js",
      path: path.resolve(__dirname, "../build")
    },
    //tells webpack to run this in node js
    target: "node",
    externals: nodeExternals(),
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
                name: "images/[name].[ext]",
                //this way the file is not included in the server bundle
                emitFile: false
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
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(env.NODE_ENV)
        }
      })
    ]
  }
}
