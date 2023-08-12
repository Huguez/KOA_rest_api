const jwt = require("jsonwebtoken")
const UserModel = require("../models/User");

const generarToken = async ( id = "" ) => {
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
        throw new Error( err )
    }
}

const isExpiredJWT = ( token ) => {
    try {
        const { exp } = jwt.decode( token );
        
        if( Date.now() >= exp * 1000 ){
          return true;
        }

        return true;
      } catch (err) {
        console.log( err )
        throw new Error( "Error in isExpiredJWT - JWT.js" )
      }
}

module.exports = {
    generarToken,
    comprobarJWT,
    // isExpiredJWT
}