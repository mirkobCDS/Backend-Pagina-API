const mongoose = require('mongoose');

const ClaseSchema = mongoose.Schema({
    profesor: String,
    nombre: String,
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
    isGrupal: Boolean,
    solicitudes: [{
        userId: String,
        usuario: String,
        estado: String
    }],
    estado: String
})

module.exports = mongoose.model('Clase', ClaseSchema);