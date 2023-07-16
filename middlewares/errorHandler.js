
const errorHandler = async (ctx, next) => {
    try {
         await next();
      } catch (err) {
         ctx.status = err.status || 500;
         ctx.body = {
            error: 'Validation Error',
            message: err.message
         }
    }
}

module.exports = errorHandler;