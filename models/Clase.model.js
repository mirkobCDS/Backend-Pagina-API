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
    tipo: String,
    comentarios: [{
        comentario: String,
        isVisible: Boolean,
        usuario: String,
        isBloqueado: Boolean
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