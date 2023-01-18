const userSchema = require("../models/users");
const termaioSchema = require("../models/temarios");


const emailExists = async (email = '', id = "") => {
    const existsEmail = await userSchema.findOne({
        where: {
            email
        }
    });
    if (existsEmail) throw new Error(`El correo ${email} ya se encuentra registrado`);
}

const usernameExists = async (username = "") => {
    console.log(username);
    const existsUsername = await userSchema.findOne({
        where: {
            username
        }
    });
    if (existsUsername) throw new Error(`El nombre de usuario ${username} ya se encuentra registrado`);
}
const temarioExists = async (nombre = '') => {
    const existeTemario = await termaioSchema.findOne({
        where: {
            nombre
        }
    });
    if (existeTemario) throw new Error(`Ya tienes un temario con este nombre`);
}
const isValidTemario = async (id) => {
    const existTemario = await termaioSchema.findOne({
        where: {
            id
        }
    });
    if (!existTemario) throw new Error(`El temario digitado no existe`);
}
const isValidUser = async (id) => {
    const existsUser = await userSchema.findOne({
        where: {
            id
        }
    });
    if (!existsUser) throw new Error(`El usuario digitado no existe`);
}

const checkPassword = async (clave = '') => {
    if (!(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(clave))) throw new Error(`La contraseña es muy corta`);
}

/**
 * Funcion encargada de validar si el email que esta mandando el usuario a actualizar ya existe
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const validarEmailAUsername = async (email, id, username) => {
    const existsEmail = await userSchema.findOne({
        where: {
            email
        }
    });
    const existsUsername = await userSchema.findOne({
        where: {
            email
        }
    });
    if (existsEmail && existsEmail.id != id) throw new Error(`El correo ${email} ya se encuentra registrado`);
    if (existsUsername && existsUsername.id == id) throw new Error(`El nombre de usuario ${username} ya se encuentra registrado`);
}

module.exports = {
    emailExists,
    checkPassword,
    isValidTemario,
    validarEmailAUsername,
    usernameExists,
    temarioExists,
    isValidUser
}