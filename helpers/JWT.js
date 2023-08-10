const jwt = require("jsonwebtoken")
const UserModel = require("../models/User");

const generarToken = async ( id = "" ) => {
    return new Promise( ( resolve, reject ) => {
        const payload = { id };
        key = process.env.SECRET_KEY

        jwt.sign( payload, key, { expiresIn: "24h" }, ( err, token ) => {
            if( err ){
                console.log( err );
                reject( new Error( "Error generarToken - JWT" ) )
            }else{
                resolve( token )
            }
        } );
    } );
}

const comprobarJWT = async ( token ) => {
    try{
        if( !token ){
            return false
        }
        
        const { id } = jwt.verify( token, process.env.SECRET_KEY )
        const user = await UserModel.findByPk( id )
        
        if( !user || !user.status ){
            return false
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