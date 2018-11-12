import React from "react"
import { renderToString } from "react-dom/server"
import { StaticRouter } from "react-router"
import Routes from "../components/Routes"

import { flushChunkNames } from 'react-universal-component/server'

// provisions final <link> and <script> for particular route
// before this happens routes need to be rendered
import flushChunks from 'webpack-flush-chunks'

export default ({ clientStats }) => (req, res) => {
  
  const context = {}

  const app = renderToString(
    <StaticRouter location={req.originalUrl} context={context}>
      <Routes />
    </StaticRouter>
  )

  const { js, styles, cssHash } = flushChunks(clientStats, {
    chunkNames: flushChunkNames()
  })
  
  res.send(`
    <html>
      <head>
      <link rel="shortcut icon" href="#" />
        ${styles}
        <title>Hello Zelda</title>
      </head>
      <body>
        <div id="react-root">${app}</div>
        ${js} 
        ${cssHash}
      </body>
    </html>
  `)
}

// <div id="react-root">${renderToString(<StaticRouter location={req.url} context={{}}><Routes /></StaticRouter>)}</div>