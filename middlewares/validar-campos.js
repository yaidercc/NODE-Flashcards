const {
    validationResult
} = require("express-validator");
const temarios = require("../models/temarios");
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next Funcion que se llama si el middleware funciona
 * @returns 
 */
const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);
    next()
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next Funcion que se llama si el middleware funciona
 * @returns 
 */
const validateOwner = (req, res, next) => {
    const temario = temarios.findOne({
        usuario: req.usuario.id
    })
    if (req.body.id != temario.id) {
        return res.status(400).json({
            ok: false,
            msg: "El usuario no es el propietario del temario."
        });
    }
    next();
}


module.exports = {
    validarCampos,
    validateOwner
}