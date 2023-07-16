
const createUser = async ( ctx, next ) => {
    try {
        const { body } = ctx.request;        

        ctx.status = 200
        ctx.body = {
            msg: "createUser!!!",
            body
        }

        await next();
    } catch( err ){
        console.log( err )
        ctx.status = 400;
        ctx.body = {
            error: 'Error en el servidor',
        }
    }
}

const getUserById = ( ctx, next ) => {
    try {
        const { request, response } = ctx
        const userId = ctx.params.id

        ctx.status = 200
        ctx.body = {
            msg: "getUserById!!!",
            user: userId
        }
    } catch (error) {
        ctx.status = 500
        ctx.body = {
            msg: "Error!!!",
        }
    }
}

const getUsers = ( ctx, next ) => {
    try {
        const { request, response } = ctx

        ctx.status = 200
        ctx.body = {
            msg: "getUsers!!!",
        }
    } catch (error) {
        ctx.status = 500
        ctx.body = {
            msg: "Error!!!",
        }
    }
}

const updateUser = ( ctx, next ) => {
    try {
        // const { request, response } = ctx
        const userId = ctx.params.id

        ctx.status = 200
        ctx.body = {
            msg: "updateUser!!!",
            userId
        }
    } catch (error) {
        ctx.status = 500
        ctx.body = {
            msg: "Error!!!",
        }
    }
}

const deleteUser = ( ctx, next ) => {
    try {
        const { request, response } = ctx
        const userId = ctx.params.id
        
        ctx.status = 200
        ctx.body = {
            msg: "deleteUser!!!",
            userId
        }
    } catch (error) {
        ctx.status = 500
        ctx.body = {
            msg: "Error!!!",
        }
    }
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}