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

router.get("/temarios/:id", [
    validarJWT,
    check("id", "El id es obligatorio y debe ser numerico").isNumeric(),
    validarCampos
], getTemarioByUser);

router.get("/temario/:id", [
    validarJWT,
    check("id", "El id es obligatorio y debe ser numerico").isNumeric(),
    validarCampos
], getTemarioById);

router.post("/temario", [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("nombre").custom(temarioExists),
    check("userId").custom(isValidUser),
    validarCampos
], postTemario);

router.put("/temario/:id", [
    validarJWT,
    validateOwner,
    check("id", "El id es obligatorio y debe ser numerico").isNumeric(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos
], updateTemario);

router.delete("/temario/:id", [
    validarJWT,
    validateOwner,
    check("id", "El id es obligatorio y debe ser numerico").isNumeric(),
    validarCampos
], deleteTemario);


module.exports = router;