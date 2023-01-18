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
    deleteFlashcard
} = require("../controllers/flashcards.controller");

const router = Router();

router.get("/flahscards/:id",[
    check("id", "El id es obligatorio y debe ser numerico").isNumeric()
], getFlashcardsByTemario);

router.post("/flashcard", [
    check("termino", "El termino es obligatorio").not().isEmpty(),
    check("descripcion", "La descripcion es obligatoria").not().isEmpty(),
    check("temario", "El id del temario es obligatorio").not().isEmpty(),
    check('temario').custom(isValidTemario),
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