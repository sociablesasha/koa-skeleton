const Koa = require('koa')
const Router = require('koa-router')
const logger = require('koa-logger')
const bodyparser = require('koa-bodyparser')
const empty = require('is-empty')

const app = new Koa()
const router = new Router()
const api = require('./api')

router.use('/api', api.routes())

app
  .use(logger())
  .use(async (ctx, next) => {
    await next()
    const reqMethod = ctx.method
    const reqUrl = ctx.url
    const reqBody = ctx.request.body
    console.log(`${reqMethod} ${reqUrl}`)
    if (!empty(reqBody)) console.log(reqBody)
  })

app
  .use(bodyparser())
  .use(async ctx => {
    await next()
    console.error(ctx.response)
    console.error(ctx.request)
    ctx.body = ctx.request.body
  })

app
  // .use(bodyparser())
  .use(router.routes())
  .use(router.allowedMethods())

app
  .listen(5914, () => {
    console.log('server is listening to port 5914')
  })
