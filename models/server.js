const express = require("express");
const cors = require('cors');

const createSchemas = require("./schemas");

class Server {
    constructor() {
        this.app = express();
        // Endpoints 
        this.userRoutes = "/api/usuarios"
        this.flashcardsRoutes = "/api/flashcards"
        this.temariosRoutes = "/api/temarios"

        // Conexion a la base de datos
        this.creationSchemas();

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

    async creationSchemas() {
        await createSchemas();
    }

    routes() {
        this.app.use(this.userRoutes, require("../routes/users.routes.js"));
        this.app.use(this.flashcardsRoutes, require("../routes/flashcards.routes"));
        this.app.use(this.temariosRoutes, require("../routes/temarios.routes.js"));
    }
    listen() {
        // Puerto
        this.app.listen(process.env.PORT);
    }
}

module.exports = Server;