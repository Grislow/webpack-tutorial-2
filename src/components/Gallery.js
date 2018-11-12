import React from "react"
import '../css/Gallery.css'

const getBundle = () => {
  //magic comments allow passing arguments to webpack
  import("lodash").then(_ => {
    console.log("imported", _);
  })
}

export default () => (
  <div>
    <h1 
      onClick={getBundle}
      className='gallery'
    >
      Gallery
    </h1>
  </div>
)
