const {
    DataTypes
} = require('sequelize');
const connect = require("../database/config.db");

// Conexion a la base de datos

const userSchema = connect()
    .then(connection => {
        // Creando esquema de usuario
        const Schema = connection.define("users", {
            nombres: {
                type: DataTypes.STRING,
                allowNull: false
            },
            apellidos: {
                type: DataTypes.STRING,
                allowNull: false
            },
            username: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            email: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            clave: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        });

        connection.sync()
            .catch((error) => {
                console.error('No se pudo crear la tabla usuarios ', error);
            });
        return userSchema;

    }).catch(err => {
        console.log(err);
    })




module.exports = userSchema;