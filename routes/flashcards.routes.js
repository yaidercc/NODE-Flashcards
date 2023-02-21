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
    getFlashcardsByTemario,
    postFlashcard,
    updateFlashcard,
    deleteFlashcard,
    getFlashcard
} = require("../controllers/flashcards.controller");
const { isValidTemario,validarJWT } = require("../helpers");

const router = Router();

router.get("/flashcardsByTemario/:id",[
    validarJWT,
    check("id", "El id es es invalido o esta vacio").isMongoId(),
    validarCampos
], getFlashcardsByTemario);

router.get("/:id",[
    validarJWT,
    check("id", "El id es es invalido o esta vacio").isMongoId(),
    validarCampos
], getFlashcard);

router.post("/", [
    validarJWT,
    check("termino", "El termino es obligatorio").not().isEmpty(),
    check("descripcion", "La descripcion es obligatoria").not().isEmpty(),
    check("temario", "El id del temario es obligatorio").not().isEmpty(),
    check('temario').custom(isValidTemario),
    validarCampos
], postFlashcard);

router.put("/:id", [
    validarJWT,
    check("id", "El id es es invalido o esta vacio").isMongoId(),
    check("termino", "El termino es obligatorio").not().isEmpty(),
    check("descripcion", "La descripcion es obligatoria").not().isEmpty(),
    validarCampos
], updateFlashcard);

router.delete("/:id", [
    validarJWT,
    check("id", "El id es es invalido o esta vacio").isMongoId(),
    validarCampos
], deleteFlashcard);

module.exports = router;



