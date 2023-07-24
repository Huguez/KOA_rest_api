
const notFound = ( ctx ) => {
    ctx.status = 404
    return ctx.body = {
        msg: "endpoint don't found"
    }
}


module.exports = notFound