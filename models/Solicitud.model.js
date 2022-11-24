const mongoose = require('mongoose');

const SolicitudSchema = mongoose.Schema({
    idAlumno: String,
    idClase: String,
    telefono: String,
    horario: String,
    mensaje: String,
    estado: String,
    costo: Number,
    nombre: String,
    descripcion: String,
    materia: String,
    profesor: String,
    horario: String,
    tipo: String,
    frecuencia: String,
    calificacion: Number,
    valoracion : Number

})

module.exports = mongoose.model('Solicitud', SolicitudSchema);