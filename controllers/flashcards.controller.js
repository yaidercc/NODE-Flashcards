const flashcard = require("../models/flashcards");

// TODO: ensayar crud flashcards
/**
 * Funcion para obtener flashcards por el id del temario
 * @param {*} req 
 * @param {*} res 
 */
const getFlashcardsByTemario = async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const flashcards = await flashcard.findAll({
            where: {
                temarioId: id
            }
        });

        res.json({
            ok: true,
            msg: "Flashcards consultadas con exito.",
            flashcards
        })
    } catch (error) {
        res.status(500).json({
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
        color
    } = req.body;

    try {
        await flashcard.create({
            termino,
            descripcion,
            color
        });

        res.json({
            ok: true,
            msg: "Flashcard agregada con exito.",
        })
    } catch (error) {
        res.status(500).json({
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
        await flashcard.update({
            termino,
            descripcion,
            color
        }, {
            where: {
                id: id
            }
        });

        res.json({
            ok: true,
            msg: "Flashcard actualizada con exito.",
        })
    } catch (error) {
        res.status(500).json({
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
        await flashcard.destroy({
            where: {
                id: id
            }
        });

        res.json({
            ok: true,
            msg: "Flashcard eliminada con exito.",
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Hubo un error al realizar la operacion: " + error
        })
    }
}

module.exports = {
    getFlashcardsByTemario,
    postFlashcard,
    updateFlashcard,
    deleteFlashcard
}