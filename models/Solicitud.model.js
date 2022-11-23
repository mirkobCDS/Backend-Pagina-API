const mongoose = require('mongoose');

const SolicitudSchema = mongoose.Schema({
    idAlumno: String,
    idClase: String,
    telefono: String,
    horario: String,
    mensaje: String,
    estado: String,
    costo: Number
})

module.exports = mongoose.model('Solicitud', SolicitudSchema);