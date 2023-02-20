const flashcard = require("../models/flashcards");

/**
 * Funcion para obtener una flashcard
 * @param {*} req 
 * @param {*} res 
 */
const getFlashcard = async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const flashcards = await flashcard.findById(id)
            .populate("temario", "nombre");

        res.json({
            ok: true,
            msg: "Flashcard consultadas con exito.",
            flashcards
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Hubo un error al realizar la operacion: " + error
        })
    }
}
/**
 * Funcion para obtener flashcards por el id del temario
 * @param {*} req 
 * @param {*} res 
 */
const getFlashcardsByTemario = async (req, res) => {
    const {
        id
    } = req.params;

    const {
        limite = 5, desde = 0
    } = req.query;

    try {

        const [flashcards, total] = await Promise.all([
            // Registros
            flashcard.find({
                temario: id,
                estado: true
            })
            .populate("temario", "nombre")
            .skip(+desde)
            .limit(+limite),

            // Contador de registros
            flashcard.countDocuments({
                estado: true
            })
            .skip(+desde)
            .limit(+limite),
        ]);

        res.json({
            ok: true,
            msg: "Flashcards consultadas con exito.",
            flashcards,
            total
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Hubo un error al realizar la operacion: " + error
        })
    }
}

/**
 * Funcion par agregar una flashcard
 * @param {*} req 
 * @param {*} res 
 */
const postFlashcard = async (req, res) => {
    const {
        termino,
        descripcion,
        color,
        temario
    } = req.body;

    try {
        const newFlashcard = new flashcard({
            termino,
            descripcion,
            color,
            temario
        });

        await newFlashcard.save()

        res.json({
            ok: true,
            msg: "Flashcard agregada con exito.",
            flashcard: newFlashcard
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Hubo un error al realizar la operacion: " + error
        })
    }
}

/**
 * Funcion para actualizar una flashcards
 * @param {*} req 
 * @param {*} res 
 */
const updateFlashcard = async (req, res) => {
    const {
        id
    } = req.params;
    const {
        termino,
        descripcion,
        color
    } = req.body;

    try {
        const updtFlashcards = await flashcard.findByIdAndUpdate(id, {
            termino,
            descripcion,
            color
        });

        res.json({
            ok: true,
            msg: "Flashcard actualizada con exito.",
            flashcard:updtFlashcards
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Hubo un error al realizar la operacion: " + error
        })
    }
}

/**
 * Funcion para borrar una flashcards
 * @param {*} req 
 * @param {*} res 
 */
const deleteFlashcard = async (req, res) => {
    const {
        id
    } = req.params;

    try {
        await flashcard.findByIdAndUpdate(id, {
            estado: false
        });

        res.json({
            ok: true,
            msg: "Flashcard eliminada con exito.",
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Hubo un error al realizar la operacion: " + error
        })
    }
}

module.exports = {
    getFlashcardsByTemario,
    postFlashcard,
    updateFlashcard,
    deleteFlashcard,
    getFlashcard
}