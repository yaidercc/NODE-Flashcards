const {Schema,model} = require("mongoose");

const RoleSchema=Schema({
    nombre:{
        type:String,
        required:[true,'Los nombres son obligatorios']
    },
    propietario: {
        type:Schema.ObjectId,
        ref: "Usuario",
        required: [true, 'El propietario es obligatorio']
    },
})

module.exports=model('Temario',RoleSchema);