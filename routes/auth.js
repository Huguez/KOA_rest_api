const Router = require("koa-router")

const errorHandler = require("../middlewares/errorHandler");
const authSchema = require("../schema/authSchema");
const { login, signUp } = require("../controllers/auth");

const router = new Router()

router.use( errorHandler);

router.post( "/login", authSchema.loginValidate, login )

router.post( "/signUp", authSchema.signUpValidate, signUp )

// router.post( "/renew", authSchema.renewValidate, renew )

module.exports = router;