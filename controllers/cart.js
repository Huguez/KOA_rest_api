const UserModel = require("../models/User")
const ProductModel = require("../models/Product")
const { comprobarJWT } = require("../helpers/JWT")

const getCart = async ( ctx ) => {
    try {
        const { request } = ctx
        const { token } = request.headers

        const user = await comprobarJWT( token )
        
        if( !user ){
            ctx.status = 404
            return ctx.body = {
                msg: "Usuario no encontrado!!!"
            }    
        }

        const cart = await user.getCart()

        const products =  await cart.getProducts()
        
        ctx.status = 200
        return ctx.body = {
            cart: products,
        }
    } catch (error) {
        console.log( error )
        ctx.status = 500;
        return ctx.body = {
            msg: "Error en getCart  - Cart.js"
        }
    }
}

const updateCart = async ( ctx ) => {
    try {
        const { productId } = ctx.request.body
        const { request } = ctx
        const { token } = request.headers

        const user = await comprobarJWT( token )

        const cart = await user.getCart()

        const products = await cart.getProducts({ where: { id: productId } })
        
        let newQty = 1;
        let auxPro;

        if( products.length > 0 ){
            auxPro = products[0]
        }

        // agregar un producto que ya estaba 
        if( auxPro ){
            newQty = auxPro.cartItem.qty + 1
        }

        // agregar un nuevo producto
        const product = await ProductModel.findByPk( productId )
        await cart.addProduct( product, { through: { qty: newQty } } )
        
        const list = await cart.getProducts()

        ctx.status = 200
        return ctx.body = {
            cart: list
        }
    } catch (error) {
        console.log( error )
        ctx.status = 500;
        return ctx.body = {
            msg: "Error en updateCart - Cart.js"
        }
    }
}

const deleteCart = async ( ctx ) => {
    try {
        const { productId } = ctx.request.body
        const { request } = ctx
        const { token } = request.headers

        const user = await comprobarJWT( token )

        const cart = await user.getCart()

        const products = await cart.getProducts({ where: { id: productId } })

        let newQty;
    
        // que no este el producto en el carrito
        if ( products.length === 0 ) {
            ctx.status = 404;
            return ctx.body = {
                msg: "el producto no esta en el carrito "
            }
        } else {
            // que este mas de un producto en el carrito
            const product = products[0]
            if( product.cartItem.qty > 1 ){
                newQty = product.cartItem.qty - 1
                await product.cartItem.set( { qty: newQty } )
                await product.cartItem.save()
            } else {
                // que un producto en el carrito
                await product.cartItem.destroy()        
            }
        }
    
        const list = await cart.getProducts()

        ctx.status = 200;
        return ctx.body = {
            cart: list,
         
        }
    } catch (error) {
        console.log( error )
        ctx.status = 500;
        return ctx.body = {
            msg: "Error en deleteCart - cart.js"
        }
    }
}

module.exports = {
    getCart,
    updateCart,
    deleteCart
}