const express = require('express')
const consola = require('consola')
const {Nuxt, Builder} = require('nuxt')
const app = express()

const config = require('../nuxt.config.js')

const api = require('./api')
const {winstonMiddleware} = require('./utils/logger')
const logger = require('./utils/logger')

app.use('/api/*', winstonMiddleware)
app.use('/api', api)
app.use('/test', (req, res) => {
  res.json({test: true})
})

process.on('uncaughtException', (err) => {
  logger.error({
    action: 'uncaughtException',
    message: `Caught exception: ${err}`
  })
})

process.on('unhandledRejection', (reason, p) => {
  logger.error({
    action: 'unhandledRejection',
    message: `Unhandled Rejection at: Promise ${p}, reason: ${reason}`
  })
})

// Import and Set Nuxt.js options
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  const nuxt = new Nuxt(config)

  const {host, port} = {host: nuxt.options.server.host, port: nuxt.options.server.port}


  // Init Nuxt.js
  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(nuxt.render)


  // Listen the server
  app.listen(port, () => {
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true
    })
  })
}

start()
