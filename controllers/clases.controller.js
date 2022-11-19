const Clase = require('../models/Clase.model');

exports.getClases = async function (req, res, next) {
    try {
        const clases = await Clase.find();  // Trae todas las clases de la BD
        res.json(clases);
    } catch (err) {
        res.json({message: err})
    }
}

exports.createClase = async function (req, res, next) {
    const clase = new Clase({
        profesor: req.body.profesor,
        nombre: req.body.nombre,
        materia: req.body.materia,
        duracion: req.body.duracion,
        frecuencia: req.body.frecuencia,
        costo: req.body.costo,
        valoracion: req.body.valoracion,
        comentarios: req.body.comentarios,
        calificaciones: req.body.calificaciones,
        isPublicada: req.body.isPublicada,
        isGrupal: req.body.isPublicada
    });
    try {
        const createdClase = await clase.save();
        res.json(createdClase);
    } catch (err) {
        res.json({message: err})
    }
}

exports.updateClase = async function (req, res, next) {
    try {
        const updatedClase = await Clase.updateOne(
            { _id: req.params.claseId }, //No se qué significa esto por ende no lo toco...
            { $set: { nombre: req.body.nombre }},
            { $set: { materia: req.body.materia }},
            { $set: { duracion: req.body.duracion }},
            { $set: { frecuencia: req.body.frecuencia }},
            { $set: { costo: req.body.costo }},
        );
        res.json(updatedClase);
    } catch (err) {
        res.json({message: err})
    }
}


exports.deleteClase = async function (req, res, next) {
    try {
        const removedClase = await Clase.remove({_id: req.params.claseId});
        res.json(removedClase);
    } catch (err) {
        res.json({message: err})
    }
}

exports.publicarClase = async function (req, res, next) {
    try {
        const updatedClase = await Clase.updateOne(
            { _id: req.params.claseId },
            { $set: { isPublicada: true }},
        );
        res.json(updatedClase);
    } catch (err) {
        res.json({message: err})
    }
}

exports.despublicarClase = async function (req, res, next) {
    try {
        const updatedClase = await Clase.updateOne(
            { _id: req.params.claseId },
            { $set: { isPublicada: false }},
        );
        res.json(updatedClase);
    } catch (err) {
        res.json({message: err})
    }
}

exports.comentarYValorarClase = async function (req, res, next) {
    const newComment = {
        "calificacion": req.body.calificacion,
        "comentario": req.body.comentario
    }
    try {
        const updatedClase = await Clase.updateOne(
            { _id: req.params.claseId },
            { $push: { comentarios: newComment }},
        );
        res.json(updatedClase);
    } catch (err) {
        res.json({message: err})
    }
}

exports.comentarClase = async function (req, res, next) {
    const newComment = {
        "comentario": req.body.comentario,
        "isVisible": false
    }
    try {
        const updatedClase = await Clase.updateOne(
            { _id: req.params.claseId },
            { $push: { comentarios: newComment }},
        );
        res.json(updatedClase);
    } catch (err) {
        res.json({message: err})
    }
}

exports.valorarClase = async function (req, res, next) {
    const newValoracion = {
        "valor": req.body.valoracion,
        "isVisible": false
    }
    try {
        const updatedClase = await Clase.updateOne(
            { _id: req.params.claseId },
            { $push: { calificaciones: newValoracion }},
        );
        res.json(updatedClase);
    } catch (err) {
        res.json({message: err})
    }
}

exports.comentariosByClaseId = async function (req, res, next) {
    try {
        const clase = await Clase.findById(req.params.claseId)
        const comentarios = clase.comentarios
        res.send(comentarios);
    } catch (err) {
        res.json({message: err})
    }
}

exports.actualizarValoracion = async function (req, res, next) {
    try {
        const clase = await Clase.findById(req.params.claseId);
        const calificaciones = clase.calificaciones.map(function (calificacion) { return calificacion.valor; });
        const average = calificaciones.reduce((a, b) => a + b, 0) / calificaciones.length;
        const updatedClase = await Clase.updateOne(
            { _id: req.params.claseId },
            { $set: { valoracion: average }},
        );
        res.json(updatedClase);
    } catch (err) {
        res.json({message: err})
    }
}