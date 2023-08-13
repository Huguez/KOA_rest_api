const { DataTypes } = require("sequelize")
const db = require("../db/config")

const User = db.define( "user", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        validate: {
            len: [4, 6]
        },
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
        validate: {
            isNotShort: (value) => {
                if (value.length < 6) {
                    throw new Error('Password should be at least 8 characters');
                }
            }
        },
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        validate: {
            min: 18,
            max: 100
        },
        allowNull: false
    },
    role: {
        type: DataTypes.STRING, // To-Do: checar si se puede hacer un tipado multiple
        defaultValue: "CUSTOMER",
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: true
    },
} )

module.exports = User;