const {
    Router
} = require("express");
const {
    validarCampos
} = require("../middlewares/validar-campos");
const {
    login,
    sendEmailPass,
    changePass
} = require("../controllers/auth.controller");
const {
    usernameExists,
    emailExists,
    checkPassword,
    validarJWT
} = require("../helpers");
const {
    createUser
} = require("../controllers/auth.controller");
const {
    check
} = require("express-validator");

const router = Router();

router.post("/login", [
    check("username", "El nombre de usuario es obligatorio").not().isEmpty(),
    check("clave", "La clave es obligatoria.").not().isEmpty(),
    validarCampos
], login);


router.post("/singin", [
    check("nombres", "Los nombres son obligatorios").not().isEmpty(),
    check("apellidos", "Los apellidos son obligatorios").not().isEmpty(),
    check("username", "El nombre de usuario es obligatorio").not().isEmpty(),
    check("username").custom(usernameExists),
    check("email", "El correo electronico es obligatorio").not().isEmpty(),
    check("email").custom(emailExists),
    check("clave", "La clave es obligatoria").not().isEmpty(),
    check("clave").custom(checkPassword),
    validarCampos
], createUser);

router.post("/sendEmailChangePassword", [
    check("email", "Email vacio o invalido").isEmail(),
    validarCampos
], sendEmailPass);


router.post("/changePassword", [
    validarJWT,
    check("clave", "La clave es obligatoria").not().isEmpty(),
    check("clave").custom(checkPassword),
    validarCampos
], changePass);

router.post("/validateToken", validarJWT);


module.exports = router;

