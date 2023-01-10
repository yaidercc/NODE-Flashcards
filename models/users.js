const {Schema,model} = require("mongoose");


const RoleSchema=Schema({
    nombres:{
        type:String,
        required:[true,'Los nombres son obligatorios']
    },
    apellidos:{
        type:String,
        required:[true,'Los apellidos son obligatorios']
    },
    username:{
        type:String,
        required:[true,'El nombre de usuario es obligatorio']
    },
    email:{
        type:String,
        required:[true,'El email es obligatorio']
    },
    clave:{
        type:String,
        required:[true,'La clave es obligatoria']
    },
    
})

module.exports=model('Usuario',RoleSchema);