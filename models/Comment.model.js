const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    usuario: String,
    comentario: String,
    bloqueado: Boolean,
    descargo: String
})

module.exports = mongoose.model('Comment', CommentSchema);