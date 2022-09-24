const moment = require('moment-timezone')
const {createLogger, format, transports} = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file')

const {combine, label, printf} = format

const logsPath = 'logs'

const myFormat = printf(
  (info) => `${info.timestamp} ${info.level}: ${JSON.stringify(info.message)}`
)

const appendTimestamp = format((info, opts) => {
  if (opts.tz)
    info.timestamp = moment() // eslint-disable-line
      .tz(opts.tz)
      .format()
  return info
})

const logger = createLogger({
  level: 'info',
  format: combine(
    label(),
    appendTimestamp({tz: moment.tz.guess()}),
    myFormat
  ),
  transports: [
    new transports.File({
      filename: `${logsPath}/error.log`,
      level: 'error'
    }),
    new transports.File({
      filename: `${logsPath}/combined.log`
    }),
    new DailyRotateFile({
      format: myFormat,
      filename: `${logsPath}/application.log`,
      datePattern: 'YYYY-MM-DD-HH',
      prepend: true,
      localTime: true,
      level: process.env.NODE_ENV === 'development' ? 'debug' : 'info'
    })
  ]
})

logger.add(
  new transports.Console({
    format: myFormat
  })
)

const winstonMiddleware = (req, res, next) => {
  const userId = 'anonymous'
  let ip = req
    ? req.headers['x-forwarded-for'] || req.connection.remoteAddress
    : '0.0.0.0'

  ip = ip.split(',')[0]

  const message = {
    userId,
    ip,
    action: `${req.method} ${req.originalUrl || req.url}`
  }

  logger.info(message)
  next()
}

module.exports = logger
module.exports.winstonMiddleware = winstonMiddleware
