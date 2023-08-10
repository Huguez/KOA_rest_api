const ModelProduct = require("../models/Product")
const { comprobarJWT } = require("../helpers/JWT")


const createProduct = async ( ctx ) => {
    try {
        const { body } = ctx.request;
        const { request } = ctx
        const { token } = request.headers

        const user = await comprobarJWT( token )
        
        const product = await user.createProduct( { ...body } )

        await product.save()

        ctx.status = 201;
        return ctx.body = {
            product,
        }
    } catch( error ){
        console.log( error )
        ctx.status = 500;
        return ctx.body = {
            msg: "Error en el servidor - createProduct",
            error
        }
    }
}

const getProductById = async ( ctx ) => {
    try {
        const productId = ctx.params.id

        const product = await ModelProduct.findOne( { where: { id: productId } } )
        
        ctx.status = 200;
        return ctx.body = {
            product
        }
    } catch( error ){
        console.log( error )
        ctx.status = 500;
        return ctx.body = {
            msg: "Error en el servidor - getProductById",
            error
        }
    }
}

const getProducts = async ( ctx ) => {
    try {
        const products = await ModelProduct.findAll( { where: { status: true } } )        
        
        ctx.status = 200;
        return ctx.body = {
            products,
        }
    } catch( error ){
        console.log( error )
        ctx.status = 500;
        return ctx.body = {
            msg: "Error en el servidor - getProducts",
            error
        }
    }
}

const updateProduct = async ( ctx ) => {
    try {
        const { body } = ctx.request;
        const productId = ctx.params.id;

        const product = await ModelProduct.findOne( {
            attributes: [ "id", "name", "price", "status" ],
            where: { id: productId }
        } )

        await product.set({
            ...body,
        })

        await product.save();
        
        ctx.status = 200;
        return ctx.body = {
            product
        }
    } catch( error ){
        console.log( error )
        ctx.status = 500;
        return ctx.body = {
            msg: "Error en el servidor - updateProduct",
            error
        }
    }
}

const deleteProduct = async ( ctx ) => {
    try {
        const productId = ctx.params.id;

        const product = await ModelProduct.findOne( {
            where: { id: productId }
        } )

        await product.set({
            status: false
        })

        await product.save();
        
        ctx.status = 200;
        return ctx.body = {
            product
        }
    } catch( error ){
        console.log( error )
        ctx.status = 500;
        return ctx.body = {
            msg: "Error en el servidor - deleteProduct",
            error
        }
    }
}

module.exports = {
    createProduct,
    getProductById,
    getProducts,
    updateProduct,
    deleteProduct,
}