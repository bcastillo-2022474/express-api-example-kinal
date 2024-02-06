const {model, Schema} = require('mongoose');

const AnimalSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    especie: {
        type: String,
        required: [true, 'La especie es obligatoria']
    },
    expectativa_de_vida: {
        type: Number,
        required: [true, 'La expectativa de vida es obligatoria']
    },
    peso: {
        type: Number,
        required: [true, 'El peso es obligatorio']
    },
    altura: {
        type: Number,
        required: [true, 'La altura es obligatoria']
    },
    tp_estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Animal', AnimalSchema);