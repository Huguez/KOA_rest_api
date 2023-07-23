

// To-Do: terminar la validacion del token
const validarJWT = async ( ctx, next ) => {
    try {
        const { request:{ headers } } = ctx
        const token = headers["token"]

        console.log( token )

        await next();
    } catch (error) {
        ctx.status = 500
        ctx.body = {
            msg: "Error en el servidor"
        }
    }
} 

module.exports = validarJWT