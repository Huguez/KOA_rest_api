const { comprobarJWT } = require("../helpers/JWT");
const UserModel  = require("../models/User");
const bcrypyjs = require("bcryptjs");

const salt = bcrypyjs.genSaltSync()

const createUser = async ( ctx ) => {
    try {
        const { body } = ctx.request;
        const { headers } = ctx.request
        const token = headers["token"]

        const userA = await comprobarJWT( token )

        if( !userA ){
            ctx.status = 401
            return ctx.body = {
                msg: `don't exist the user with token: ${ token } `
            }
        }

        if( userA["dataValues"].role !== "ADMIN" ){
            ctx.status = 401
            return ctx.body = {
                msg: `The user ${ userA["dataValues"].email } is unauthorized to create new user`
            }
        }

        const tempPass = body.password;
        const hashPasword = bcrypyjs.hashSync( tempPass, salt )

        const user = await UserModel.create( body );
        user.password = hashPasword;

        await user.createCart()
        
        await user.save();

        ctx.status = 201;
        return ctx.body = {
            user,
        }
    } catch( err ){
        console.log( err )
        ctx.status = 500;
        return ctx.body = {
            msg: 'Error en el servidor createUser - user.js',
            err,
        }
    }
}

const getUserById = async ( ctx ) => {
    try {
        const userId = ctx.params.id

        const user = await UserModel.findOne( { 
            attributes: [ 'id', 'email', "name", "password", "status" ],
            where:{ id: userId } 
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

        ctx.status = 200
        return ctx.body = {
            user
        }
    } catch (error) {
        ctx.status = 500
        ctx.body = {
            msg: "Error!!!",
        }
    }
}

const getUsers = async ( ctx ) => {
    try {
        const userA = await comprobarJWT( token )

        if( userA["dataValues"].role !== "ADMIN" ){
            ctx.status = 401
            return ctx.body = {
                msg: `Only admins can list users`
            }
        }

        const users = await UserModel.findAll({ 
            attributes: [ "id", "name", "email", "status" ],
            where:{ status: true } 
        } );

        ctx.status = 200
        return ctx.body = {
            users
        }
    } catch (error) {
        ctx.status = 500
        ctx.body = {
            msg: "Error!!!",
        }
    }
}

const updateUser = async ( ctx ) => {
    try {
        const userId = ctx.params.id
        const { body } = ctx.request

        const user =  await UserModel.findOne( {
            attributes: [ "id", "email", "status", "role" ],
            where: { id: userId }
        } )
        
        if( !user ){
            ctx.status = 404;
            return ctx.body = {
                msg: `the user isn't exist!!!`
            }
        }

        if ( userId !== user["dataValues"].id || user["dataValues"].role !== "ADMIN" ) {
            ctx.status = 401;
            return ctx.body = {
                msg: `the user ${ user["dataValues"].email } is is unauthorized to update this user`
            }
        }


        if( !user["dataValues"].status ){
            ctx.status = 406;
            return ctx.body = {
                msg: `the user have status inactive!!!`
            }
        }

        const tempPass = body.password;
        const hashPasword = bcrypyjs.hashSync( tempPass, salt )

        await user.set( {
            ...body,
            password: hashPasword,
        } );

        await user.save()

        ctx.status = 200;
        return ctx.body = {
            user,
        }
    } catch (error) {
        ctx.status = 500
        ctx.body = {
            msg: "Error en Update user !!!",
        }
    }
}

const deleteUser = async ( ctx ) => {
    try {
        const userId = ctx.params.id
        
        const user = await UserModel.findOne( { 
            attributes: [ 'id', 'email', "name", "password", "status", "role" ],
            where:{ id: userId } 
        } );

        if( !user ){
            ctx.status = 404;
            return ctx.body = {
                msg: `the e-mail isn't exist !!!`,
            }
        }

        if ( userId !== user["dataValues"].id || user["dataValues"].role !== "ADMIN" ) {
            ctx.status = 401;
            return ctx.body = {
                msg: `the user ${ user["dataValues"].email } is is unauthorized to update this user`
            }
        }
        
        if ( !user["dataValues"].status ) {
            ctx.status = 406;
            return ctx.body = {
                msg: `the e-mail ${ user["dataValues"].email } have a status inactive !!!`,
            } 
        }

        await user.set( {
            status: false
        } )

        await user.save()
        
        ctx.status = 200
        return ctx.body = {
            user
        }
    } catch (error) {
        ctx.status = 500
        return ctx.body = {
            msg: "Error en Delete user!!!",
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