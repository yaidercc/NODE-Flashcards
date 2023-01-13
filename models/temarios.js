const {
    DataTypes
} = require('sequelize');
const connection = require("../database/config.db");
const userSchema = require('./users');

const temarioSchema = connection.define("temarios", {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

userSchema.hasMany(temarioSchema, {
    foreignKey: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
temarioSchema.belongsTo(userSchema);

module.exports = temarioSchema;