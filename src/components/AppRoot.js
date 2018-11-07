import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import Routes from "./Routes"
import { hot } from "react-hot-loader";
import "./nav.css"

class AppRoot extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Router>
        <Routes />
      </Router>
    )
  }
}

export default hot(module)(AppRoot);