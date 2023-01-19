const {
    DataTypes
} = require('sequelize');
const connection = require("../database/config.db");

const temarioSchema = require('./temarios');

const flashcardsSchema = connection.define("flashcards", {
    termino: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        defaultValue:"#000000"
    },

});
temarioSchema.hasMany(flashcardsSchema, {
    foreignKey: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
flashcardsSchema.belongsTo(temarioSchema);


module.exports = flashcardsSchema;