const {
    Schema,
    model
} = require("mongoose");


const FlashcardsSchema = Schema({
    termino: {
        type: String,
        required: [true, 'El termino es obligatorio'],
    },
    desripcion: {
        type: String,
        required: [true, "La descripcion es obligatorio"],
    },
    color: {
        type: String,
        default: "#000000"
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Temario',
        required: true
    }
});

FlashcardsSchema.methods.toJSON = function () {
    // Funcion para evitar mostrar la contraseña en el objeto de salida.
    const {
        __v,
        _id,
        ...flashcard
    } = this.toObject();
    return {
        id: _id,
        ...flashcard
    };
}
module.exports = model('Flashcard', FlashcardsSchema);