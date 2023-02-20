const {
    Schema,
    model
} = require("mongoose");


const TemarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    descripcion: {
        type: String,
        required: [true, "La descripcion es obligatorio"],
    },
    estado:{
        type:Boolean,
        default:true
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
        ...temario
    } = this.toObject();
    return {
        id: _id,
        ...temario
    };
}
module.exports = model('Temario', TemarioSchema);