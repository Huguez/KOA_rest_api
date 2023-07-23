const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require('koa-bodyparser');
const KoaStatic = require("koa-static");

require('dotenv').config()
const path = require('path');

const sqlz = require("../db/config")

const userRouter = require("../routes/user");
const authRouter = require("../routes/auth");

class Server {

    constructor(){
        this.app = new Koa();
        this.router = new Router();
        this.port = process.env.PORT;

        this.base = "/api/v1"
        this.path = {
            userPath: `${ this.base }/user`,
            authPath: `${ this.base }/auth`,
        }
      
        this.#middlewares()

        this.#routers();
    }

    #routers(){
        this.router.use( this.path["userPath"], userRouter.routes() );
        this.router.use( this.path["authPath"], authRouter.routes() );
        
        this.app.use( this.router.routes() )
        this.app.use( this.router.allowedMethods() )
    }

    #middlewares(){
        const staticDirPath = path.join( __dirname, '../public' );
        this.app.use( KoaStatic( staticDirPath ) );
        
        this.app.use( bodyParser() );
    }

    #connectDB(){
        sqlz.sync({ force: true }).then( () => {
            console.log( "Connection to DB done!!" )
        } ).catch( ( err ) => {
            console.log( err )
        } )
    }

    start(){
        this.app.listen( this.port, () => {
            this.#connectDB()
            console.log( `Server up!!!` );
            console.log( `Running on http://localhost:${ this.port }/` )
        } );
    }
}

module.exports =  Server;