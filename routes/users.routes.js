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
    deleteUser,
    getUser
} = require("../controllers/users.controller");
const {
    emailExists,
    checkPassword
} = require("../helpers/db-validator");

const router = Router();

router.get("/users/:id_user", [
    check("id_user", "El id de usuario no puede estar vacio.").not().isEmpty(), 
    validarCampos
], getUser);

router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.post("/users", [
    check("nombres", "Los nombres son obligatorios").not().isEmpty(),
    check("apellidos", "Los apellidos son obligatorios").not().isEmpty(),
    check("username", "El nombre de usuario es obligatorio").not().isEmpty(),
    check("email", "El correo electronico es obligatorio").not().isEmpty(),
    check("email").custom(emailExists),
    check("clave", "La clave es obligatoria").not().isEmpty(),
    check("clave").custom(checkPassword),
    validarCampos
], createUser);

module.exports = router;