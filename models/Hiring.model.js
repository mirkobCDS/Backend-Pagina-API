const mongoose = require('mongoose');
const ClaseModel = require('./Clase.model');

//Hay que definir cómo vamos a representar al estado.
const HiringSchema = mongoose.Schema({
    usuario: String,
    clase: ClaseModel,
    telefonoContacto: String,
    mailContacto: String,
    horarioRef: String,
    mensaje: String,
    estado: String
})

module.exports = mongoose.model('Hiring', HiringSchema);