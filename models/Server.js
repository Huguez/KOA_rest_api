const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require('koa-bodyparser');

const userRouter = require("../routes/user");

class Server {

    constructor(){
        this.app = new Koa();
        this.router = new Router();
        this.port = 3000;

        this.base = "/api/v1"
        this.path = {
            userPath: `${ this.base }/user`,
        }

        this.middlewares()

        this.routers();
    }

    routers(){
        this.router.use( this.path["userPath"] , userRouter.routes() );

        this.app.use( this.router.routes() )
        this.app.use( this.router.allowedMethods() )
    }

    middlewares(){
        this.app.use( bodyParser() );

    }

    start(){
        this.app.listen( this.port, () => {
            console.log( `Server up!!!` );
            //To Do: base datos!!!
            console.log( `Running on http://localhost:${ this.port }/` )
        } );
    }
}

module.exports =  Server;