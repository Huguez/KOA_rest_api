const Router = require("koa-router");
const router = new Router();

const errorHandler = require("../middlewares/errorHandler")
const validarJWT = require("../middlewares/validarJWT")
const cartSchema = require("../schema/cartSchema");

const { getCart, updateCart, deleteCart } = require("../controllers/cart");

router.use( errorHandler )

router.use( validarJWT )

router.get( "/", getCart )

router.put( "/update", cartSchema.updateValidator, updateCart )

router.delete( "/delete", cartSchema.updateValidator, deleteCart )

module.exports = router