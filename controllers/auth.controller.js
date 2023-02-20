const usuarios = require("../models/usuarios");
const generateJWT = require("../helpers/generar-jwt");
const bycryptjs = require("bcryptjs");
const sedMails = require("../helpers/sendEmail");


/**
 * Funcion encargada de crear un usuario
 * @param {*} req 
 * @param {*} res 
 */
const createUser = async (req, res) => {
    try {
        const {
            nombres,
            apellidos,
            username,
            email,
            clave
        } = req.body;


        const usuario = new usuarios({
            nombres,
            apellidos,
            username,
            email,
            clave
        });

        // Encriptar la contraseña 
        const salt = bycryptjs.genSaltSync();
        usuario.clave = bycryptjs.hashSync(clave, salt);

        await usuario.save();

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
        const usuario = await usuarios.findOne({
            username,
        });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: "Usuario incorrecto"
            })
        }

        // Valida la contraseña
        const validatePass = bycryptjs.compareSync(clave, usuario.clave);
        if (!validatePass) {
            return res.status(400).json({
                ok: false,
                msg: "Clave incorrecta"
            })
        }

        // Generar token
        const token = await generateJWT(usuario.id, usuario.username);

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: "Hubo un error al realizar la operacion: " + error
        });
    }
}

/**
 * Funcion encargada de enviar el correo para reestablecer clave al correo proporcionado
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const sendEmailPass = async (req, res = response) => {
    try {
        const {
            email
        } = req.body

        const usuario = await usuarios.findOne({
            email
        })

        // Se valida si el correo existe.
        if (!usuario) {
            return res.json({
                ok: true,
                msg: "El correo indicado no existe."
            })
        }

        // Se genera un token de un solo uso
        const token = await generateJWT(usuario.id, "", "1h");

        // Se envia el correo
        sedMails(
            "Reestablecer contraseña",
            "Clic en el siguiente para reestablecer la contraseña.",
            `<a href="https://www.youtube.com/${token}">Reestablecer contraseña</a>`,
            email
        ).catch((err) => {
            return res.status(400).json({
                ok: false,
                msg: "Hubo un error al enviar el correo: " + err,
            });
        });

        res.json({
            ok: true,
            msg: "Correo enviado con exito."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            error
        })
    }
}

/**
 * Funcion encargada de cambiar la contraseña por medio del enlace enviado al usuario 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const changePass = async (req, res = response) => {
    let {
        clave
    } = req.body;
    const {
        id
    } = req.usuario
    try {

        // Encriptar la contraseña 
        const salt = bycryptjs.genSaltSync();
        clave = bycryptjs.hashSync(clave, salt);

        await usuarios.findByIdAndUpdate(id, {
            clave
        }, {
            new: true
        })

        res.json({
            ok: true,
            msg: "Clave actualizada con exito."
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            error
        })
    }
}


module.exports = {
    login,
    createUser,
    sendEmailPass,
    changePass
}