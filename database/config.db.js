const Sequelize = require('sequelize');

const sequelize = new Sequelize('flashcards', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Conexión a la base de datos establecida con éxito.');
    })
    .catch(err => {
        console.error('No se puede conectar a la base de datos:', err);
    });

module.exports = sequelize;