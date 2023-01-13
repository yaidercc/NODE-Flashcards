const connection = require("../database/config.db");
const flashcardsSchema = require("./flashcards");
const temarioSchema = require("./temarios");
const userSchema = require("./users");

const createSchemas = async () => {
    try {
        await connection.sync();
        console.log("Creacion de esquemas exitosa");
    } catch (error) {
        throw error;
    }
}

module.exports = createSchemas;