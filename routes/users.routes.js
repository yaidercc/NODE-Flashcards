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
    getUser
} = require("../controllers/users.controller");
const {
    emailExists,
    usernameExists,
    checkPassword,
} = require("../helpers/db-validator");

const router = Router();

router.get("/users/:id_user", [
    check("id_user", "El id de usuario no puede estar vacio.").not().isEmpty(),
    validarCampos
], getUser);

router.put("/users/:id", [
    check("id", "El id es obligatorio").isNumeric(),
    check("nombres", "Los nombres son obligatorios").not().isEmpty(),
    check("apellidos", "Los apellidos son obligatorios").not().isEmpty(),
    check("username", "El nombre de usuario es obligatorio").not().isEmpty(),
    check("email", "El correo electronico es obligatorio").not().isEmpty(),
    validarCampos
], updateUser);


router.post("/users", [
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

module.exports = router;