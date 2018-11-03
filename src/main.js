require("babel-runtime/regenerator");

//accepts and reloads the component maintaining state
//below is deprecated as of react-hot-loader-v.4^
// require("react-hot-loader/patch");

require("babel-register");
//setups the websocket connection with the client
//?reload=true -> enables nodemons auto reload
require("webpack-hot-middleware/client?reload=true");
require("./main.css");
require("./index.html");
require("./app")
//debugger
