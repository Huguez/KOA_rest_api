const koaJoiValidate =  require("koa-joi-validate")
const Joi = require("joi")

const cartSchema = {
    updateValidator: koaJoiValidate({
        body: Joi.object({
            productId: Joi.number().integer().required()
        })
    })
}

module.exports = cartSchema;
