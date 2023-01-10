const {
    Router
} = require("express");
const {
    check
} = require("express-validator");
const {
    validarCampos
} = require("../middlewares/validar-campos");

const router = Router();

router.get("/users");
router.put("/users/:id");
router.delete("/users/:id");
router.post("/users");

module.exports = router;