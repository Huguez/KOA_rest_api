const { DataTypes } = require("sequelize")
const db = require("../db/config")

const User = db.define( "user", {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isEmail: true
        },
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: true
    }
} )

module.exports = User;