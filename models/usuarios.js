const {
    Schema,
    model
} = require("mongoose");


const UsuarioSchema = Schema({
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    clave: {
        type: String,
        required: false
    }
});

UsuarioSchema.methods.toJSON = function () {
    // Funcion para evitar mostrar la contraseña en el objeto de salida.
    const {
        __v,
        _id,
        clave,
        ...usuario
    } = this.toObject();
    return {
        id: _id,
        ...usuario
    };
}
module.exports = model('Usuario', UsuarioSchema);