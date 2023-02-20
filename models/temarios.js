const {
    Schema,
    model
} = require("mongoose");


const TemarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    desripcion: {
        type: String,
        required: [true, "La descripcion es obligatorio"],
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

TemarioSchema.methods.toJSON = function () {
    // Funcion para evitar mostrar la contraseña en el objeto de salida.
    const {
        __v,
        _id,
        ...usuario
    } = this.toObject();
    return {
        id: _id,
        ...usuario
    };
}
module.exports = model('Temario', TemarioSchema);