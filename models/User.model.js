const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    nombre: String,
    mail: String,
    password: String,
    rol: String,
})

module.exports = mongoose.model('User', UserSchema);