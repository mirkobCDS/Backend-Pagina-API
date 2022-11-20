const mongoose = require('mongoose');

const ClaseSchema = mongoose.Schema({
    profesor: String,
    nombre: String,
    descripcion: String,
    materia: String,
    duracion: String,
    frecuencia: String,
    costo: Number,
    valoracion: Number,
    comentarios: [{
        comentario: String,
        isVisible: Boolean
    }],
    calificaciones: [{
        valor: Number,
    }],
    isPublicada: Boolean,
    isGrupal: Boolean
})

module.exports = mongoose.model('Clase', ClaseSchema);