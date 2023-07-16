const KoaJoiValidate = require('koa-joi-validate')
const Joi = require("joi");

const userSchema = {
    bodyValidate: KoaJoiValidate({
        body: Joi.object( {
            name:     Joi.string().required(),
            email:    Joi.string().email().required(),
            age:      Joi.number().integer().min(18).max(100).required(),
            password: Joi.string().required(),
        })
    } ),
    paramsValidate: KoaJoiValidate({
        params: Joi.object({
            id: Joi.number().integer().required(),
        })
    }),
    updateValidate: KoaJoiValidate({
        body: Joi.object( {
            name:     Joi.string().required(),
            email:    Joi.string().email().required(),
            age:      Joi.number().integer().min(18).max(100).required(),
            password: Joi.string().required(),
        }),
        params: Joi.object({
            id: Joi.number().integer().required(),
        })
    }),
    queryValidate: KoaJoiValidate({
        query: Joi.object({
            search: Joi.string().required(),
        })
    })
};


module.exports = userSchema