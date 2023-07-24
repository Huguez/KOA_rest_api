const { DataTypes } = require("sequelize")
const db = require("../db/config")

const Cart = db.define( "cart", {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
} );

const CartItem = db.define( "cartItem", {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    qty:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
} );

module.exports = {
    Cart,
    CartItem,
}