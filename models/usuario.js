const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type: String,
        require: [true, 'El nombre debe de ser obligatorio']
    },
    correo:{
        type: String,
        require: [true, 'el correo debe res obligatorio'],
        unique: true
    },
    password:{
        type: String,
        require: [true, 'la clave es obligatoria']
    },
    img:{
        type: String
    },
    role:{
        type: String,
        require: [true],
        enum: ["ADMIN_ROLE", "USER_ROLE", "VENTAS_ROLE"]
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }

});

module.exports = model('Usuario', UsuarioSchema);