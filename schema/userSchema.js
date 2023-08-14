const KoaJoiValidate = require('koa-joi-validate')
const Joi = require("joi");


const body = Joi.object( {
    name:     Joi.string().required(),
    email:    Joi.string().email().required(),
    age:      Joi.number().integer().min(18).max(100).required(),
    role:     Joi.string().required(),
    password: Joi.string().required(),
})

const params = Joi.object({
    id: Joi.number().integer().required(),
})

const userSchema = {
    createValidate: KoaJoiValidate({
        body
    } ),
    paramsValidate: KoaJoiValidate({
        params
    }),
    updateValidate: KoaJoiValidate({
        body,
        params
    }),
    queryValidate: KoaJoiValidate({
        query: Joi.object({
            search: Joi.string().required(),
        })
    })
};


module.exports = userSchema