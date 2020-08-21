const Joi = require('joi')

exports.list = (ctx) => {
  ctx.body = 'listed'
}

exports.create = (ctx) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    author: Joi.string().required()
  })
  const result = schema.validate(ctx.request.body)
  if (result.error) {
    ctx.status = 400
    ctx.body = result.error
  } else {
    ctx.body = `created ${result.value}`
  }
}

exports.delete = (ctx) => {
  ctx.body = 'deleted'
}

exports.replace = (ctx) => {
  ctx.body = 'replaced'
}

exports.update = (ctx) => {
  ctx.body = 'updated'
}
