const UserModel = require("../models/User")

const { Order: OrderModel } = require("../models/Order")

const createOrder = async ( ctx ) => {
    try {
        const user = await UserModel.findByPk( 1 )
        
        const cart = await user.getCart()

        const products = await cart.getProducts()
        
        let totalQty = 0;
        products.forEach( p => totalQty += p.cartItem.qty )

        const orderAux = await user.createOrder({ qty: totalQty })

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
        // const user = await UserModel.findByPk( 4 )

        const orders = await OrderModel.findAll({ offset: 0, limit: 40, where:{ userId: 1 } })

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

        const orderAux = await OrderModel.findOne({ where:{ id: orderId } })

        const products = await orderAux.getProducts()
        // { where: { orderId: orderId } }
        
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

        // const user = await UserModel.findOne({ where: { id: 1 } })

        const order = await OrderModel.findAll( { where: { id: orderId }  } )
        
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

        const order = await OrderModel.findOne({ where:{ id: orderId } })

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