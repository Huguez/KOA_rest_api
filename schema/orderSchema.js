const Joi = require("joi")
const KoaJoiValidate = require("koa-joi-validate")

const params = Joi.object({
    id: Joi.string().required()
});

const body = Joi.object({
    address: Joi.string().required()
});


const orderSchema = {
    createValidation: KoaJoiValidate( {
        body
    } ),
    updateValidation: KoaJoiValidate( {
        params,
        body
    } ),
    deleteValidation: KoaJoiValidate( {
        params
    } )
}

module.exports = orderSchema