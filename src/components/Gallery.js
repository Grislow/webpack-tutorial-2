import React from "react"

const getBundle = () => {
  //magic comments allow passing arguments to webpack
  import("lodash").then(_ => {
    console.log("imported", _);
  })
}

export default () => (
  <div>
    <h1 onClick={getBundle}>Gallery</h1>
  </div>
)
