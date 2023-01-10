const {Schema,model} = require("mongoose");

const RoleSchema=Schema({
    termino:{
        type:String,
        required:[true,'Los nombres son obligatorios']
    },
    descripcion:{
        type:String,
        required:[true,'Los apellidos son obligatorios']
    },
    color:{
        type:String,
        required:[true,'El nombre de usuario es obligatorio']
    },
    temario: {
        type:Schema.ObjectId,
        ref: "Temario",
        required: [true, 'El temario es obligatorio']
    },
})

module.exports=model('Flashcard',RoleSchema);