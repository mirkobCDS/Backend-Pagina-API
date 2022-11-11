const mongoose = require('mongoose');

const ClassSchema = mongoose.Schema({
    profesor: String,
    nombre: String,
    materia: String,
    duracion: String,
    frecuencia: String,
    costo: Float32Array,
    calificacion: Int8Array,
    comentarios: Array,
    publicada: Boolean
})

module.exports = mongoose.model('Class', ClassSchema);