const Router = require("koa-router");
const { getCart, updateCart, deleteCart } = require("../controllers/cart");
const router = new Router();

router.get( "/", getCart )

router.put( "/update", updateCart )

router.delete( "/delete", deleteCart )

module.exports = router