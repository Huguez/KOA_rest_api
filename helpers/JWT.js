const jwt = require("jsonwebtoken")
const UserModel = require("../models/User");

const generarToken = async ( id = "" ) => {
    return new Promise( ( resolve, reject ) => {
        const payload = { id };
        key = process.env.SECRET_KEY

        jwt.sign( payload, key, { expiresIn: "24h" }, ( err, token ) => {
            if( err ){
                console.log( err );
                reject( err )
            }else{
                resolve( token )
            }
        } );
    } );
}

const comprobarJWT = async ( token ) => {
    try{
        if( !!token || token.length < 10 ){
            return null
        }
        
        const { id } = jwt.verify( token, process.env.SECRET_KEY )
        const user = await UserModel.findByPk( id )

        if( !user || !user.status ){
            return null
        } else {
            return user;
        }
    } catch( err ){
        console.log( error );
        throw new Error( "Error comprobarJWT - JWT" )
    }
}

module.exports = {
    generarToken,
    comprobarJWT,
}