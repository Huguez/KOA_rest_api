
const { comprobarJWT } = require("../helpers/JWT")
const { Order: OrderModel } = require("../models/Order")

const createOrder = async ( ctx ) => {
    try {
        const { request } = ctx
        const { body } = request
        const { token } = request.headers

        const user = await comprobarJWT( token )
        
        const cart = await user.getCart()

        const products = await cart.getProducts()
        
        let totalQty = 0;
        products.forEach( p => totalQty += p.cartItem.qty )

        const orderAux = await user.createOrder({ qty: totalQty, address: body.address })

        const orders = await orderAux.addProducts( products.map( product => {
            product.orderItem = { qty: product.cartItem.qty }   
            return product;
        } ) );

        await orderAux.save()

        await cart.setProducts( null )

        ctx.status = 200
        return ctx.body = {
            orders
        }
    } catch (error) {
        console.log( error )
        ctx.status = 500;
        return ctx.body = {
            msg: "Error en createOrder - order.js"
        }
    }
}

const getOrders = async ( ctx ) => {    
    try {
        const { request } = ctx
        const { token } = request.headers

        const user = await comprobarJWT( token )
        
        const orders = await OrderModel.findAll({ offset: 0, limit: 40, where:{ userId: user["dataValues"].id } })

        ctx.status = 200
        return ctx.body = {
            orders
        }
    } catch (error) {
        console.log( error )
        ctx.status = 500;
        return ctx.body = {
            msg: "Error en getOrders - order.js"
        }
    }
}

const getOrderById = async ( ctx ) => {
    try {
        const orderId = ctx.params.id
        
        const orderAux = await OrderModel.findByPk( orderId )

        const products = await orderAux.getProducts()
        
        ctx.status = 200
        return ctx.body = {
            order: {
                ...orderAux,
                products
            }
        }
    } catch ( error ){
        console.log( error )
        ctx.status = 500;
        return ctx.body = {
            error,
            msg: "Error en getOrderById - order.js"
        }
    }
}

const updateOrder = async ( ctx ) => {
    try {
        const orderId = ctx.params.id
        const { address } = ctx.request.body

        const order = await OrderModel.findByPk( orderId )
        
        await order.set( { address } )

        await order.save()

        ctx.status = 200
        return ctx.body = {
            order
        }
    } catch (error) {
        console.log( error )
        ctx.status = 500;
        return ctx.body = {
            error,
            msg: "Error en updateOrder - order.js"
        }
    }
}

const deleteOrder = async ( ctx ) => {
    try {
        const orderId = ctx.params.id

        const order = await OrderModel.findByPk( orderId )

        await order.set({
            status: false
        })

        await order.save()

        ctx.status = 200
        return ctx.body = {
            order
        }
    } catch (error) {
        ctx.status = 500;
        return ctx.body = {
            msg: "Error en deleteOrder - order.js"
        }
    }
}

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder
}