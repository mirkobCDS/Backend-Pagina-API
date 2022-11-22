const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    usuario: String,
    comentario: String,
    isBloqueado: {
        type : Boolean, 
        default : false
    },
    descargo: {
        type : String, 
        default : ""
    }
})

module.exports = mongoose.model('Comment', CommentSchema);