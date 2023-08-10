const Joi = require("joi")
const KoaJoiValidate = require("koa-joi-validate")

const orderSchema = {
    updateValidation: KoaJoiValidate( {
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            address: Joi.string().required()
        })
    } ),
    deleteValidation: KoaJoiValidate( {
        params: Joi.object({
            id: Joi.string().required()
        })
    } )
}

module.exports = orderSchema