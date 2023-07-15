

const getUser = ( ctx, next ) => {
    ctx.body = {
        msg: "Hello World!!!",
    }
}

module.exports = {
    getUser,
}