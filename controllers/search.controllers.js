const {
    response
} = require("express");
const {
    flashcards,
    temarios,
    usuarios
} = require("../models");


const {
    ObjectId
} = require("mongoose").Types

const coleccionesPermitidas = [
    "flashcards",
    "temarios",
    "usuarios",
];

/**
 * Funcion encargada de hacer las busquedas en flashcards
 * @param {*} termino 
 * @param {*} res 
 * @returns 
 */
const buscarFlashcards = async (termino = "", res = response) => {
    const esMongoId = ObjectId.isValid(termino);

    if (esMongoId) {
        const flashcard = await flashcards.findById(termino).populate("usuario", "nombre");
        return res.json({
            results: flashcard ? [flashcard] : []
        });
    }

    const regex = new RegExp(termino, "i");

    const flashcard = await flashcards.find({
        $or: [{
            termino: regex
        }],
        $and: [{
            estado: true
        }]
    }).populate("temario", "nombre");

    res.json({
        results: flashcard
    })
}

/**
 * Funcion encargada de hacer las busquedas en temarios
 * @param {*} termino 
 * @param {*} res 
 * @returns 
 */
const buscarTemarios = async (termino = "", res = response) => {
    const esMongoId = ObjectId.isValid(termino);

    if (esMongoId) {
        const temario = await temarios.findById(termino).populate("usuario", "nombre");
        return res.json({
            results: temario ? [temario] : []
        })
    }

    const regex = new RegExp(termino, "i");

    const temario = await temarios.find({
        $or: [{
            nombre: regex
        }],
        $and: [{
            estado: true
        }]
    });

    res.json({
        results: temario
    })
}

/**
 * Funcion encargada de hacer las busquedas en usuarios
 * @param {*} termino 
 * @param {*} res 
 * @returns 
 */
const buscarUsuarios = async (termino = "", res = response) => {
    const esMongoId = ObjectId.isValid(termino);

    if (esMongoId) {
        const usuario = await usuarios.findById(termino);
        return res.json({
            results: usuario ? [usuario] : []
        })
    }

    const regex = new RegExp(termino, "i");

    const usuario = await usuarios.find({
        $or: [{
            nombres: regex
        }, {
            apellidos: regex
        }, {
            email: regex
        }, {
            username: regex
        }],
        $and: [{
            estado: true
        }]
    });

    res.json({
        results: usuario
    })
}


/**
 * Funcion encargada de llamar a las diferentes funciones para realizar las busquedas.
 * @param {*} termino 
 * @param {*} res 
 * @returns 
 */
const search = (req, res = response) => {
    const {
        coleccion,
        termino
    } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las coleccione permitidas son ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case "flashcards":
            buscarFlashcards(termino, res)
            break;
        case "temarios":
            buscarTemarios(termino, res)
            break;
        case "usuarios":
            buscarUsuarios(termino, res)
            break;
        default:
            res.status(500).json({
                msg: `Se me olvido hacer esta busqueda`
            })
    }

}

module.exports = {
    search
}