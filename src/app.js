const Koa = require('koa')

const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const helmet = require('koa-helmet')
const jwt = require('./middlewares/jwt')

const index = require('./routes/index')
const users = require('./routes/users')
const works = require('./routes/works')
const templates = require('./routes/templates')
const channel = require('./routes/channel')
const utils = require('./routes/utils')
// 安装预防，设置必要的 http 头
app.use(helmet())
app.use(jwt)
// error handler
onerror(app)

// middlewares
app.use(
    bodyparser({
        enableTypes: ['json', 'form', 'text'],
    })
)

app.use(json())
app.use(logger())
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(works.routes(), works.allowedMethods())
app.use(templates.routes(), works.allowedMethods())
app.use(channel.routes(), channel.allowedMethods())
app.use(utils.routes(), utils.allowedMethods())

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app