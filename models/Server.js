const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require('koa-bodyparser');
const KoaStatic = require("koa-static");

require('dotenv').config()
const path = require('path');

const sqlz = require("../db/config")
const notFound = require("../middlewares/notFound")

const userRouter = require("../routes/user");
const authRouter = require("../routes/auth");
const productRouter = require("../routes/product");
const cartRouter = require("../routes/cart");

const User = require("./User");
const Product = require("../models/Product")
const { Order, OrderItem } = require("../models/Order")
const { Cart, CartItem } = require("../models/Cart");

class Server {

    constructor(){
        this.app = new Koa();
        this.router = new Router();
        this.port = process.env.PORT;

        this.base = "/api/v1"
        this.path = {
            userPath: `${ this.base }/user`,
            authPath: `${ this.base }/auth`,
            productPath: `${ this.base }/product`,
            cartPath: `${ this.base }/cart`,
        }
      
        this.#middlewares()

        this.#routers();
    }

    #routers(){
        this.router.use( this.path["userPath"],    userRouter.routes() );
        this.router.use( this.path["authPath"],    authRouter.routes() );
        this.router.use( this.path["productPath"], productRouter.routes() );
        this.router.use( this.path["cartPath"],    cartRouter.routes() );

        this.app.use( this.router.routes() )
        this.app.use( this.router.allowedMethods() )

        this.app.use( notFound )
    }

    #middlewares(){
        const staticDirPath = path.join( __dirname, '../public' );
        this.app.use( KoaStatic( staticDirPath ) );
        
        this.app.use( bodyParser() ); //app.use(bodyParser.urlencoded({ extended: false }));
    }

    #connectDB(){
        Product.belongsTo( User, {  // foreign key en Product
            constrains: true,
            onDelete: "CASCADE"
        } );
        
        User.hasMany( Product );  // foreign key en Product
        User.hasOne( Cart );      // foreign key en Cart
        
        Cart.belongsTo( User );   // foreign key en Cart
        Cart.belongsToMany( Product, { through: CartItem } ); // CartItem used as junction table
        
        Product.belongsToMany( Cart, { through: CartItem } ); // CartItem used as junction table
        
        User.hasMany( Order );    // foreign key en Order
        Order.belongsTo( User );  // foreign key en Order

        Order.belongsToMany( Product, { through: OrderItem } ); // OrderItem used as junction table
        Product.belongsTo( Order, { through: OrderItem } );     // OrderItem used as junction table

        const { NODE_ENV } = process.env
        const setting = NODE_ENV !== "development" ? { force: true } : {} 
        
        sqlz.sync( setting ).then( () => {
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