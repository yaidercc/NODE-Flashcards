const {
    Router
} = require("express");
const {
    check
} = require("express-validator");
const {
    validarCampos
} = require("../middlewares/validar-campos");
const {
    createUser,
    updateUser,
    getUser,
    login,
    refreshToken
} = require("../controllers/users.controller");

const {
    validarJWT,
    emailExists,
    usernameExists,
    checkPassword,
    isValidUser
} = require("../helpers");


const router = Router();

router.get("/:id_user", [
    check("id_user", "El id de usuario no puede estar vacio.").not().isEmpty(),
    validarCampos
], getUser);

// router.post("/googleSignIn", [
//     check("id_token", "El id token es necesario.").not().isEmpty(),
//     validarCampos
// ], googleSignin);


router.put("/:id", [
    check("id", "El id es obligatorio").isMongoId(),
    check("id").custom(isValidUser),
    check("nombres", "Los nombres son obligatorios").not().isEmpty(),
    check("apellidos", "Los apellidos son obligatorios").not().isEmpty(),
    check("username", "El nombre de usuario es obligatorio").not().isEmpty(),
    check("email", "El correo electronico es obligatorio").not().isEmpty(),
    validarCampos
], updateUser);



// router.get("/renew",validarJWT, refreshToken);

module.exports = router;