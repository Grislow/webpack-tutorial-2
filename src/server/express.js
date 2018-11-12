import express from "express"
const server = express()
import path from "path"
const expressStaticGzip = require("express-static-gzip")
import webpack from "webpack"
import webpackHotServerMiddleware from "webpack-hot-server-middleware"
import DashboardPlugin from 'webpack-dashboard/plugin'


import configDevClient from "../../config/webpack.dev-client.js"
import configDevServer from "../../config/webpack.dev-server.js"
import configProdClient from "../../config/webpack.prod-client.js"
import configProdServer from "../../config/webpack.prod-server.js"

const isProd = process.env.NODE_ENV === "production"
const isDev = !isProd
const PORT = process.env.PORT || 8080
let isBuilt = false
const done = () => {
  !isBuilt &&
    server.listen(PORT, () => {
      isBuilt = true
      console.log(
        `Server listening on http://localhost:${PORT} in ${
          process.env.NODE_ENV
        }`
      )
    })
}
if (isDev) {

  //passing webpack a config file and returning a compiler
  //  -webpack can return multiple compilers when you pass an array of config files
  const compiler = webpack([configDevClient, configDevServer])


  const clientCompiler = compiler.compilers[0]
  const serverCompiler = compiler.compilers[1]

  clientCompiler.apply(new DashboardPlugin());

  // Below solves an endless compilation error during dynamic require
  //  -install and uncomment if you see the error
  // require("webpack-mild-compile")(compiler)

  const webpackDevMiddleware = require("webpack-dev-middleware")(
    compiler,
    configDevClient.devServer
  )

  const webpackHotMiddleware = require("webpack-hot-middleware")(
    clientCompiler,
    configDevClient.devServer
  )

  server.use(webpackDevMiddleware)
  server.use(webpackHotMiddleware)
  server.use(webpackHotServerMiddleware(compiler))
  console.log("Middleware enabled")
  done()
} else {
  //creates the prod server bundle
  webpack([configProdClient, configProdServer]).run((err, stats) => {
    const clientStats = stats.toJson().children[0]
    const render = require("../../build/prod-server-bundle.js").default

  server.use(
    expressStaticGzip("dist", {
      enableBrotli: true
    })
  )
  server.use(render({ clientStats }))
  done()
  })
}
