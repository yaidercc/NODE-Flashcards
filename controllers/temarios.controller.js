const temarios = require("../models/temarios");

/**
 * Funcion para obtener los temarios de un usuario
 * @param {*} req 
 * @param {*} res 
 */
const getTemarioByUser = async (req, res) => {
    const {
        usuario
    } = req.params;

    try {
        const temario = await temarios.find({
            usuario
        });

        res.json({
            ok: true,
            msg: "temario consultado con exito.",
            temarios: temario
        })
    } catch (error) {
        return res.status(500).json({
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
        const temario = await temarios.findById(id);

        res.json({
            ok: true,
            msg: "temario consultado con exito.",
            temario
        })
    } catch (error) {
        return res.status(500).json({
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
        usuario
    } = req.body;

    try {
        const newTemario = new temarios({
            nombre,
            descripcion,
            usuario
        });
        await newTemario.save();

        res.json({
            ok: true,
            msg: "Temario agregado con exito.",
            newTemario
        })
    } catch (error) {
        return res.status(500).json({
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
        descripcion
    } = req.body;

    try {
        const temario = await temarios.findByIdAndUpdate(id, {
            nombre,
            descripcion
        },{
            new:true
        });

        res.json({
            ok: true,
            msg: "Temario actualizado con exito.",
            temario
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
const deleteTemario = async (req, res) => {
    const {
        id
    } = req.params;

    try {
        await temarios.findByIdAndUpdate(id, {
            estado: false
        });

        res.json({
            ok: true,
            msg: "Temario eliminado con exito.",
        })
    } catch (error) {
        return res.status(500).json({
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