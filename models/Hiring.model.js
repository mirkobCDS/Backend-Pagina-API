const mongoose = require('mongoose');
const ClassModel = require('./Class.model');

//Hay que definir cómo vamos a representar al estado.
const HiringSchema = mongoose.Schema({
    usuario: String,
    clase: ClassModel,
    telefonoContacto: String,
    mailContacto: String,
    horarioRef: String,
    mensaje: String,
    estado: String
})

module.exports = mongoose.model('Hiring', HiringSchema);