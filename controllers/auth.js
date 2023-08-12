const { generarToken, comprobarJWT, isExpiredJWT } = require("../helpers/JWT");
const UserModel = require("../models/User");
const bcrypyjs = require("bcryptjs")

const salt = bcrypyjs.genSaltSync()

const login = async ( ctx ) => {
    try {
        const { body } = ctx.request;        

        const user = await UserModel.findOne( { 
            attributes: [ 'id', 'email', "name", "password", "status" ],
            where:{ email: body.email } 
        } );
        
        if( !user ){
            ctx.status = 404;
            return ctx.body = {
                msg: `the e-mail ${ body.email } isn't exist !!!`,
            }
        }
        
        if ( !user["dataValues"].status ) {
            ctx.status = 406;
            return ctx.body = {
                msg: `the e-mail ${ body.email } have a status inactive !!!`,
            }  
        }

        const validarPass = bcrypyjs.compareSync( body.password, user["dataValues"].password )
        if ( !validarPass ) {
            ctx.status = 406;
            return ctx.body = {
                msg: `password incorrect !!!`,
            }
        }

        const token = await generarToken( user["dataValues"].id )

        ctx.user = user

        ctx.status = 202
        return ctx.body = {
            user,
            token
        }
    } catch (error) {
        console.log( error )
        ctx.status = 500
        return ctx.body = {
            error,
            msg: "Error en Login"
        }
    }
};

const signUp = async ( ctx ) => {
    try {
        const { body } = ctx.request;

        const tempPass = body.password;
        const hashPasword = bcrypyjs.hashSync( tempPass, salt )

        const user = await UserModel.create( body );
        
        user.password = hashPasword;
        
        await user.createCart()
        
        await user.save();

        const token = await generarToken( user["dataValues"].id )

        ctx.status = 201
        return ctx.body = {
            user,
            token
        }
    } catch (error) {
        console.log( error )
        ctx.status = 500
        return ctx.body = {
            msg: "Error en el server",
            error,
        }
    }
}

const renew = async ( ctx ) => {
    try {
        const { request } = ctx
        const { token } = request.headers
        
        const user = await comprobarJWT( token )
        const { id } = user["dataValues"]
        const newToken = await generarToken( id )

        ctx.status = 200;
        return ctx.body = {
            token: newToken
        }
    } catch( error ) {
        console.log( error )
        ctx.status = 500
        return ctx.body = {
            msg: "Error en renew.js",
        }
    }
}

module.exports = {
    login,
    signUp,
    renew
}