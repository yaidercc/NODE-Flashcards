const {
    DataTypes
} = require('sequelize');
const connection = require("../database/config.db");

const userSchema = connection.define("users", {
    nombres: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    clave: {
        type: DataTypes.STRING,
        allowNull: false
    }
});



module.exports = userSchema;