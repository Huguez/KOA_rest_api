

// To-Do: terminar la validacion del token
const validarJWT = async ( ctx, next ) => {
    try {
        const { request:{ headers } } = ctx
        const token = headers["token"]

        if (!token) {
            ctx.status = 400
            return ctx.body = {
                msg: "No hay token!!!",
            }    
        }else{
            await next();
        }

    } catch (error) {
        console.log( error )
        ctx.status = 500
        return ctx.body = {
            msg: "Error en validarJWT.js",
            error
        }
    }
} 

module.exports = validarJWT