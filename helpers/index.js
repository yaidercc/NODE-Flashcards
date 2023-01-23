const isValidTemario = require("../helpers/db-validator");
const validarJWT = require("../helpers/validar-jwt");

module.exports={
    ...isValidTemario,
    validarJWT
}