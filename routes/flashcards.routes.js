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
const { isValidTemario } = require("../helpers/db-validator");

const router = Router();

router.get("/flashcards/:id",[
    check("id", "El id es obligatorio y debe ser numerico").isNumeric(),
    validarCampos
], getFlashcardsByTemario);

router.get("/flashcard/:id",[
    check("id", "El id es obligatorio y debe ser numerico").isNumeric(),
    validarCampos
], getFlashcard);

router.post("/flashcard", [
    check("termino", "El termino es obligatorio").not().isEmpty(),
    check("descripcion", "La descripcion es obligatoria").not().isEmpty(),
    check("temarioId", "El id del temario es obligatorio").not().isEmpty(),
    check('temarioId').custom(isValidTemario),
    validarCampos
], postFlashcard);

router.put("/flashcard/:id", [
    check("id", "El id es obligatorio y debe ser numerico").isNumeric(),
    check("termino", "El termino es obligatorio").not().isEmpty(),
    check("descripcion", "La descripcion es obligatoria").not().isEmpty(),
    validarCampos
], updateFlashcard);

router.delete("/flashcard/:id", [
    check("id", "El id es obligatorio y debe ser numerico").isNumeric(),
    validarCampos
], deleteFlashcard);

module.exports = router;