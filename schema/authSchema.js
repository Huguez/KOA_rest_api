const KoaJoiValidate = require('koa-joi-validate')
const Joi = require("joi");

const authSchema = {
    loginValidate: KoaJoiValidate( {
        body: Joi.object({
            email:    Joi.string().required(),
            password: Joi.string().required()
        } )
    } ),
    signUpValidate: KoaJoiValidate( {
        body: Joi.object( {
            name:     Joi.string().required(),
            email:    Joi.string().email().required(),
            age:      Joi.number().integer().min(18).max(100).required(),
            password: Joi.string().required(),
        })
    } )
}

module.exports = authSchema;