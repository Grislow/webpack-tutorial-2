const path = require("path")
const webpack = require("webpack")
const MiniCSSExtractPlugin = require("mini-css-extract-plugin")
const nodeExternals = require("webpack-node-externals")

module.exports = {
  name: "server",
  target: "node",
  externals: nodeExternals(),
  //having it in an object can cause 'illegal operation on a directory' error
  //  -solution: refactor entry to ordinary string
  entry: "./src/server/render.js",
  // {
  //   server: ["./src/server/render.js"]
  // },
  mode: "development",
  output: {
    filename: "dev-server-bundle.js",
    path: path.resolve(__dirname, "../build"),
    libraryTarget: "commonjs2"
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
        // use: "css-loader"
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
              name: "/images/[name].[ext]",
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
    new MiniCSSExtractPlugin({
      filename: "main.css"
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    })
  ]
}

