const express = require("express");
const cors = require('cors');

const {
    dbConnection
} = require("../database/config.db");

class Server {
    constructor() {
        this.app = express();
        // Endpoints 
        this.userRoutes = "/api/usuarios"
        this.flashcardsRoutes = "/api/flashcards"
        this.temariosRoutes = "/api/temarios"

        // Conexion a la base de datos
        this.connectionBd();

        // Middlewares
        this.middlewares();

        // Rutas
        this.routes();

    }

    middlewares() {
        // Cors
        this.app.use(cors());

        // Lectura y parseo del body a json
        this.app.use(express.json());
    }

    async connectionBd() {
        await dbConnection();
    }

    routes() {
        this.app.use(this.userRoutes, require("../routes/users.routes.js"));
        this.app.use(this.flashcardsRoutes, require("../routes/temarios.routes.js"));
        this.app.use(this.temariosRoutes, require("../routes/temarios.routes.js"));
    }
    listen() {
        // Puerto
        this.app.listen(process.env.PORT);
    }
}

module.exports = Server;