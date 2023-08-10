const koaJoiValidate =  require("koa-joi-validate")
const Joi = require("joi")

const cartSchema = {
    updateValidator: koaJoiValidate({
        body: Joi.object({
            productId: Joi.string().required()
        })
    })
}

module.exports = cartSchema;
