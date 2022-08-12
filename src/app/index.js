const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const autoRegisterRouter = require('../router')

const { MhGlobalMiddleware } = require('../middleware/global.middleware')
const {handleError} = require('../error/handle-error')

const app = new Koa()

app.use(bodyParser())
app.use(MhGlobalMiddleware(app, handleError))
autoRegisterRouter(app)
module.exports = app
