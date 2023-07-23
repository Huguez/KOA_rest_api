const Sequelize = require("sequelize")

const { ADMIN, PASSWORD, SCHEMA, HOST } =  process.env

const sqlz = new Sequelize( SCHEMA, ADMIN, PASSWORD, { dialect: "mysql", host: HOST } )

module.exports = sqlz;