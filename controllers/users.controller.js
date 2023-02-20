const generateJWT = require("../helpers/generar-jwt");

const bycryptjs = require("bcryptjs");
const usuarios = require("../models/usuarios");

/**
 * Funcion encargada de obtener informacion de un usuario
 * @param {*} req 
 * @param {*} res 
 */
const getUser = async (req, res) => {
    try {
        const {
            id_user
        } = req.params;
        const user = await usuarios.findById(id_user);
        res.json({
            ok: true,
            msg: "Usuario consultado con exito.",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            error
        })
    }
}


/**
 * Funcion encargada de actualizar un usuario
 * @param {*} req 
 * @param {*} res 
 */
const updateUser = async (req, res) => {
    const {
        id
    } = req.params;
    const {
        clave,
        ...data
    } = req.body;
    try {
        // Valida que el email y el nombre de usuario no lo tenga otro usuario
        const findUser = await usuarios.findOne({
            username: data.username
        });

        if (findUser && findUser.id != id) {
            return res.status(400).json({
                ok: false,
                msg: "El nombre de usuario ya esta en uso"
            })
        }
        // Si el nombre de usuario no lo tiene ningun usuario o el email es del usuario que esta editando, le permite actualizarlo
        const usuario = await usuarios.findByIdAndUpdate(id, data, {
            new: true
        });

        res.json({
            ok: true,
            msg: "Usuario actualizado con exito.",
            usuario
        });
    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: "Hubo un error al realizar la operacion: " + error
        });
    }
}


/**
 * Funcion para logearse con google
 * @param {*} req 
 * @param {*} res 
 */
const googleSignin = (req, res) => {
    try {
        res.json({
            ok: true,
            msg: "correcto"
        })
    } catch (error) {
        res.json({
            ok: false,
            error
        })
    }
}

/**
 * Funcion encargada de refrescar un token
 * @param {*} req 
 * @param {*} res 
 */
const refreshToken = async (req, res) => {

    const {
        username,
        id
    } = req.usuario;

    const token = await generateJWT(id, username);

    res.json({
        ok: true,
        id,
        username,
        token,
    });
}

module.exports = {
    getUser,
    updateUser,
    refreshToken,
    googleSignin
}