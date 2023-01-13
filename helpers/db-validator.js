const userSchema = require("../models/users");


const emailExists = async (email = '') => {
    
    const existeEmail = await userSchema.findOne({ where: { email } });
    if (existeEmail) throw new Error(`El correo ${email} ya se encuentra registrado`);
}

const checkPassword = async (clave = '') => {
    if (!(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(clave))) throw new Error(`La contraseña es muy corta`);
}

module.exports={
    emailExists,
    checkPassword
}