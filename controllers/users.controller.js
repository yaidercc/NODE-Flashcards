const {
    validarEmailAUsername
} = require("../helpers/db-validator");
const generateJWT = require("../helpers/generar-jwt");
const usuario = require("../models/users");
const bycryptjs = require("bcryptjs");

const createUser = async (req, res) => {
    try {
        const {
            nombres,
            apellidos,
            username,
            email,
            clave
        } = req.body;

        // Encriptar la contraseña 
        const salt = bycryptjs.genSaltSync();
        encClave = bycryptjs.hashSync(clave, salt);

        await usuario.create({
            nombres,
            apellidos,
            username,
            email,
            clave: encClave
        })

        res.json({
            ok: true,
            msg: "agregado con exito"
        })
    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: "Hubo un error al realizar la operacion: " + error
        })
    }
}

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
        const user = await usuario.findOne({
            attributes: {
                exclude: ['clave', 'createdAt', 'updatedAt']
            },
            where: {
                id: id_user
            }
        });
        res.json({
            ok: true,
            msg: "Usuario consultado con exito.",
            user
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Hubo un error al realizar la operacion: " + error
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
        nombres,
        apellidos,
        username,
        email
    } = req.body;
    try {
        // Valida que el email y el nombre de usuario no lo tenga otro usuario
        await validarEmailAUsername(email, id, username);
        // Si el email no lo tiene ningun usuario o el email es del usuario que esta editando, le permite actualizarlo
        await usuario.update({
            nombres,
            apellidos,
            username,
            email
        }, {
            where: {
                id: id
            }
        });
        res.json({
            ok: true,
            msg: "Usuario actualizado con exito."
        });
    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: "Hubo un error al realizar la operacion: " + error
        });
    }
}

/**
 * Funcion encargada de iniciar sesion
 * @param {*} req 
 * @param {*} res 
 */
const login = async (req, res) => {
    const {
        username,
        clave
    } = req.body;

    try {

        // Validar existencia de un nombre de usuario
        const user = await usuario.findOne({
            where: {
                username,
            }
        });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "Usuario y/o clave incorrecto"
            })
        }

        // Valida la contraseña
        const validatePass = bycryptjs.compareSync(clave, user.clave);
        if (!validatePass) {
            return res.status(400).json({
                ok: false,
                msg: "Usuario y/o clave incorrecto"
            })
        }

        console.log(user.id);

        // Generar token
        const token = await generateJWT(user.id,user.username);

        res.json({
            ok: true,
            id:user.id,
            username:user.username,
            token,
            msg: "Ingreso existoso."
        });

    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: "Hubo un error al realizar la operacion: " + error
        });
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
    createUser,
    getUser,
    updateUser,
    login,
    refreshToken
}