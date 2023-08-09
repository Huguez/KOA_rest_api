const { DataTypes } = require("sequelize");
const db = require("../db/config");

const Order = db.define( 'order',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    }
} );

const OrderItem = db.define( 'orderItem',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
} );

module.exports = {
    Order,
    OrderItem
}