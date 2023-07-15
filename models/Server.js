const Koa = require("koa");
const Router = require("koa-router");

const { getUser } = require("../controllers/user")

class Server {

    constructor(){
        this.app = new Koa();
        this.router = new Router();


        this.routers()
    }

    routers(){
        this.router.get("/", getUser );

        this.app.use( this.router.routes() )
        this.app.use( this.router.allowedMethods() )
    }

    start(){
        const port = 3000

        this.app.listen( port, () => {
            console.log( `http://localhost:${ port }/` )
        } );
    }
}

module.exports =  Server;