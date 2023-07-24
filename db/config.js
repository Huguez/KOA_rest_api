const Sequelize = require("sequelize")

const { ADMIN, PASSWORD, SCHEMA, HOST, NODE_ENV } =  process.env

const sqlz = new Sequelize( SCHEMA, ADMIN, PASSWORD, { 
    dialect: "mysql", 
    host: HOST,
    logging: NODE_ENV !== "development"
} )

module.exports = sqlz;