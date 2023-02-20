const jwt = require("jsonwebtoken");
const usuarios = require("../models/usuarios");


const validarJWT = async (req, res, next) => {
    const token = req.header("x-token");
    if (!token) {
        res.json({
            ok: false,
            msg: "No hay token en la peticion."
        })
    }

    try {
        const {
            id
        } = jwt.verify(token, process.env.SECRETKEY);

        // Buscar usuario
        const user = await usuarios.findById(id)
        
        // Validar existencia del usuario
        if (!user) {
            return res.status(401).json({
                ok: false,
                msg: "Usuario no existe en la BD"
            });
        }

        req.usuario = user;
        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: "Token no valido."
        })
    }
}

module.exports = validarJWT