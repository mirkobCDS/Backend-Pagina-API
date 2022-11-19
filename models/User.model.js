const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    nombre: {
        type: String
    },
    mail: {
        type: String, 
        unique: true
    },
    password: {
        type: String
    },
    rol:{
        type: String
    },
    respuesta:{
        type: String
    },
    telefono:{
        type: String
    }
})

module.exports = mongoose.model('User', UserSchema);