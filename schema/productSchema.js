const KoaJoiValidate = require("koa-joi-validate")
const Joi = require = require("joi")

const productSchema = {
    createValidation: KoaJoiValidate( {
        body: Joi.object( {
            name:   Joi.string().required(),
            price:  Joi.number().precision(2).required(),
        } )
    } ),
    idParamValidate: KoaJoiValidate( {
        params: Joi.object({
            id: Joi.number().integer().required(),
        } )
    } ),
    updateValidate: KoaJoiValidate( {
        body: Joi.object( {
            name:     Joi.string().required(),
            price:    Joi.number().precision(2).required(),
        } ),
        params: Joi.object({
            id: Joi.number().integer().required(),
        } )
    }),
}


module.exports = productSchema