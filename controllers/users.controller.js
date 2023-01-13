const userSchema = require("../models/users");
const bycryptjs = require("bcryptjs");

const createUser = async (req, res) => {
    try {
        const {
            nombres,
            apellidos,
            username,
            email,
            clave
        } = req.body;

        // Encriptar la contraseña 
        const salt = bycryptjs.genSaltSync();
        encClave = bycryptjs.hashSync(clave, salt);

        await userSchema.create({
            nombres,
            apellidos,
            username,
            email,
            clave: encClave
        })

        res.json({
            ok: true,
            msg: "agregado con exito"
        })
    } catch (error) {
        res.status(400).json({
            ok: true,
            msg: "Hubo un error " + error
        })
    }
}

const getUser = async (req, res) => {
    const {
        id_user
    } = req.params;
    const user = await userSchema.findOne({
        where: {
            id: id_user
        }
    });
    res.json({
        ok: true,
        user
    })
}

const updateUser = (req, res) => {

}

const deleteUser = (req, res) => {

}

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser
}