import React from "react"

const getBundle = () => {
  //magic comments allow passing arguments to webpack
  import(/* webpackChunkName: "lodash" */ "lodash").then(_ => {
    console.log("imported", _);
  })
}

export default () => (
  <div>
    <h1 onClick={getBundle}>Gallery</h1>
    <p>asdadasadassad</p>
  </div>
)
