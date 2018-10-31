import express from "express";
import path from "path";

const server = express();

//imports webpack into our server
const webpack = require("webpack");
//imports the config file into our server
const config = require("../../config/webpack.dev.js");
//runs a webpack compiler using the config file
const compiler = webpack(config);

//sets up the webpack dev environment and connects it with the appropriate settings
const webpackDevMiddleware = 
require("webpack-dev-middleware")(
    compiler,
    config.devServer
);

const webpackHotMiddleware = 
require("webpack-hot-middleware")(compiler);


server.use(webpackDevMiddleware);
//this needs to be after devmiddleware, but before static middleware
server.use(webpackHotMiddleware);

//serves static files from the /dist location
const staticMiddleware = express.static("dist");

server.use(staticMiddleware);

//adding debugger pauses code at this point and awaits for inspection on node.js debugger tool
// debugger

server.listen(8080, () => {
    console.log("Server is listening");
})

