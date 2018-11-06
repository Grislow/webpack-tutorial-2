import express from "express"
const server = express()
import path from "path"

const isProd = process.env.NODE_ENV === "production"

//if not in prod run dev middleware
if(!isProd) {
  const webpack = require("webpack")
  const config = require("../../config/webpack.dev.js")
  const compiler = webpack(config)

  const webpackDevMiddleware = require("webpack-dev-middleware")(
    compiler,
    config.devServer
  )

  const webpackHotMiddlware = require("webpack-hot-middleware")(
    compiler,
    config.devServer
  )

  server.use(webpackDevMiddleware)
  server.use(webpackHotMiddlware)
  console.log("Middleware enabled")
}


const staticMiddleware = express.static("dist")
server.use(staticMiddleware)

// uses port set by heroku or 8080 for dev
const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
