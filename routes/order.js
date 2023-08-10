const Router = require("koa-router")
const router = new Router()

const OrderSchema = require("../schema/orderSchema")

const errorHandler = require("../middlewares/errorHandler")
const validarJWT = require("../middlewares/validarJWT")

const { createOrder, getOrders, getOrderById, updateOrder, deleteOrder } = require("../controllers/order")

router.use( errorHandler );

router.use( validarJWT );

router.post( "/create", createOrder )

router.get( "/", getOrders )

router.get( "/:id", getOrderById )

router.put( "/update/:id", OrderSchema.updateValidation, updateOrder )

router.delete( "/delete/:id", OrderSchema.deleteValidation, deleteOrder )

module.exports = router;