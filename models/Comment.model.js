const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    usuario: String,
    comentario: String,
    isVisible: Boolean,
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