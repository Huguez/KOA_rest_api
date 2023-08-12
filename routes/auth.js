const Router = require("koa-router")
const router = new Router()

const errorHandler = require("../middlewares/errorHandler");
const validarJWT = require("../middlewares/validarJWT");

const authSchema = require("../schema/authSchema");
const { login, signUp, renew } = require("../controllers/auth");


router.use( errorHandler);

router.post( "/login", authSchema.loginValidate, login )

router.post( "/signUp", authSchema.signUpValidate, signUp )

router.use( validarJWT )

router.post( "/renew", renew )

module.exports = router;