const jwt = require("jsonwebtoken")
const UserModel = require("../models/User");

const generarToken = async ( id = null ) => {
    return new Promise( ( resolve, reject ) => {
        const payload = { id };
        key = process.env.SECRET_KEY

        jwt.sign( payload, key, { expiresIn: "24h" }, ( err, token ) => {
            if( err ){
                console.log( err );
                reject( new Error( "Error generarToken - JWT.js" ) )
            }else{
                resolve( token )
            }
        } );
    } );
}

const comprobarJWT = async ( token = null ) => {
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
        throw new Error( err )
    }
}

module.exports = {
    generarToken,
    comprobarJWT,
}