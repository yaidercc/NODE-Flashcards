const temarios = require("../models/temarios");

/**
 * Funcion para obtener los temarios de un usuario
 * @param {*} req 
 * @param {*} res 
 */
const getTemarioByUser = async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const temario = await temarios.findAll({
            where: {
                userId:id
            }
        }) || [];

        res.json({
            ok: true,
            msg: "temario consultado con exito.",
            temarios:temario
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Hubo un error al realizar la operacion: " + error
        })
    }
}
/**
 * Funcion para obtener temarios por el id 
 * @param {*} req 
 * @param {*} res 
 */
const getTemarioById = async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const temario = await temarios.findOne({
            where: {
                id
            }
        }) || [];

        res.json({
            ok: true,
            msg: "temario consultado con exito.",
            temario
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Hubo un error al realizar la operacion: " + error
        })
    }
}

/**
 * Funcion par agregar un temario
 * @param {*} req 
 * @param {*} res 
 */
const postTemario = async (req, res) => {
    const {
        nombre,
        descripcion,
        userId
    } = req.body;

    try {
        await temarios.create({
            nombre,
            descripcion,
            userId
        });

        res.json({
            ok: true,
            msg: "Temario agregado con exito.",
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Hubo un error al realizar la operacion: " + error
        })
    }
}

/**
 * Funcion para actualizar un temario
 * @param {*} req 
 * @param {*} res 
 */
const updateTemario = async (req, res) => {
    const {
        id
    } = req.params;
    const {
        nombre,
        descripcion,
    } = req.body;

    try {
        await temarios.update({
            nombre,
            descripcion
        }, {
            where: {
                id: id
            }
        });

        res.json({
            ok: true,
            msg: "Temario actualizado con exito.",
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
const deleteTemario = async (req, res) => {
    const {
        id
    } = req.params;

    try {
        await temarios.destroy({
            where: {
                id: id
            }
        });

        res.json({
            ok: true,
            msg: "Temario eliminado con exito.",
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Hubo un error al realizar la operacion: " + error
        })
    }
}

module.exports = {
    getTemarioById,
    postTemario,
    updateTemario,
    deleteTemario,
    getTemarioByUser
}