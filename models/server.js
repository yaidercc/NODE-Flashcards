const express = require("express");
const cors = require('cors');

const {
    dbConnection
} = require("../database/config.db");

class Server {
    constructor() {
        this.app = express();
        // Endpoints 
        this.paths = {
            usuarios: "/api/usuarios",
            flashcards: "/api/flashcards",
            temarios: "/api/temarios",
            auth: "/api/auth",
            search: "/api/search"
        }

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas
        this.routes();

    }
    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // Cors
        this.app.use(cors());

        // Lectura y parseo del body a json
        this.app.use(express.json());
    }


    routes() {
        this.app.use(this.paths.usuarios, require("../routes/users.routes.js"));
        this.app.use(this.paths.flashcards, require("../routes/flashcards.routes"));
        this.app.use(this.paths.temarios, require("../routes/temarios.routes.js"));
        this.app.use(this.paths.auth, require("../routes/auth.routes.js"));
        this.app.use(this.paths.search, require("../routes/search.routes.js"));
    }
    listen() {
        // Puerto
        this.app.listen(process.env.PORT);
    }
}

module.exports = Server;