const {
    Router
} = require("express");
const {
    check
} = require("express-validator");
const {
    validarCampos, validateOwner
} = require("../middlewares/validar-campos");
const {
    temarioExists, isValidUser,
} = require("../helpers/db-validator");
const {
    getTemarioById,
    deleteTemario,
    postTemario,
    updateTemario,
    getTemarioByUser
} = require("../controllers/temarios.controller");
const { validarJWT } = require("../helpers");

const router = Router();

router.get("/temariosByUser/:usuario", [
    validarJWT,
    check("usuario","Usuario vacio o invalido").isMongoId(),
    validarCampos
], getTemarioByUser);

router.get("/:id", [
    validarJWT,
    check("id", "El id es invalido o esta vacio").isMongoId(),
    validarCampos
], getTemarioById);

router.post("/", [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("nombre").custom(temarioExists),
    check("usuario","Usuario vacio o invalido").isMongoId(),
    check("usuario").custom(isValidUser),
    validarCampos
], postTemario);

router.put("/:id", [
    validarJWT,
    validateOwner,
    check("id", "id invalido o esta vacio").isMongoId(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos
], updateTemario);

router.delete("/:id", [
    validarJWT,
    validateOwner,
    check("id", "id invalido o esta vacio").isMongoId(),
    validarCampos
], deleteTemario);


module.exports = router;



