const UserModel  = require("../models/User");
const bcrypyjs = require("bcryptjs");

const salt = bcrypyjs.genSaltSync()

const createUser = async ( ctx ) => {
    try {
        const { body } = ctx.request;

        const tempPass = body.password;
        const hashPasword = bcrypyjs.hashSync( tempPass, salt )

        const user = await UserModel.create( body );
        user.password = hashPasword;

        await user.save();

        ctx.status = 201
        ctx.body = {
            user,
        }
    } catch( err ){
        console.log( err )
        ctx.status = 400;
        ctx.body = {
            error: 'Error en el servidor',
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
        ctx.body = {
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
        // const { request, response } = ctx
        const users = await UserModel.findAll({ 
            attributes: [ "id", "name", "email", "status" ],
            where:{ status: true } 
        } );

        ctx.status = 200
        ctx.body = {
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
            attributes: [ "id", "email", "status" ],
            where: { id: userId }
        } )
        
        if( !user ){
            ctx.status = 404;
            return ctx.body = {
                msg: `the user isn't exist!!!`
            }
        }

        // To-Do: validar si el usuario del token es el mismo que del parametro
        
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
        ctx.body = {
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
            attributes: [ 'id', 'email', "name", "password", "status" ],
            where:{ id: userId } 
        } );
        
        if( !user ){
            ctx.status = 404;
            return ctx.body = {
                msg: `the e-mail isn't exist !!!`,
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
        ctx.body = {
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