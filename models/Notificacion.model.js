const mongoose = require('mongoose');

const NotificacionSchema = mongoose.Schema({
    idAlumno: String,
    nombreClase: String,
    descargo: String,
    nombreProfesor: String,
    isAbierta: Boolean

})

module.exports = mongoose.model('Notificacion', NotificacionSchema);