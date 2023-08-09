const Router = require("koa-router")

const router = new Router()

const { createOrder, getOrders, getOrderById, updateOrder, deleteOrder } = require("../controllers/order")

router.post( "/create", createOrder )

router.get( "/", getOrders )

router.get( "/:id", getOrderById )

router.put( "/update/:id", updateOrder )

router.delete( "/delete/:id", deleteOrder )

module.exports = router;