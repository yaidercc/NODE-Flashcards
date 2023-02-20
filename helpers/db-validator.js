
const usuarios = require("../models/usuarios");
const temarios = require("../models/temarios");


const emailExists = async (email = '') => {
    const existsEmail = await usuarios.findOne({
        email
    });
    if (existsEmail) throw new Error(`El correo ${email} ya se encuentra registrado`);
}

const usernameExists = async (username = "") => {
    console.log(username);
    const existsUsername = await usuarios.findOne({

        username

    });
    if (existsUsername) throw new Error(`El nombre de usuario ${username} ya se encuentra registrado`);
}
const temarioExists = async (nombre = '') => {
    const existeTemario = await temarios.findOne({
        nombre
    });
    if (existeTemario) throw new Error(`Ya tienes un temario con este nombre`);
}
const isValidTemario = async (id) => {
    const existTemario = await temarios.findById(
        id
    );
    if (!existTemario) throw new Error(`El temario digitado no existe`);
}
const isValidUser = async (id) => {
    const existsUser = await usuarios.findById(id);
    if (!existsUser) throw new Error(`El usuario digitado no existe`);
}

const checkPassword = async (clave = '') => {
    if (!(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(clave))) throw new Error(`La contraseña es muy corta`);
}


module.exports = {
    emailExists,
    checkPassword,
    isValidTemario,
    usernameExists,
    temarioExists,
    isValidUser
}