const Clase = require('../models/Clase.model');
const Comentario = require('../models/Comment.model');
const Solicitud = require('../models/Solicitud.model');


exports.getClases = async function (req, res, next) {
    try {
        const clases = await Clase.find();  // Trae todas las clases de la BD
        res.json(clases);
    } catch (err) {
        res.json({message: err})
    }
}

exports.getClaseById = async function (req, res, next) {
    try {
        const clase = await Clase.find({ _id : req.params.claseId });  // Trae todas las clases de la BD
        res.json(clase);
    } catch (err) {
        console.log(err);
        res.send({message: err})
    }
}

exports.createClase = async function (req, res, next) {
    const clase = new Clase({
        profesor: req.body.profesor,
        nombre: req.body.nombre,
        materia: req.body.materia,
        descripcion: req.body.descripcion,
        duracion: req.body.duracion,
        frecuencia: req.body.frecuencia,
        costo: req.body.costo,
        valoracion: req.body.valoracion,
        comentarios: req.body.comentarios,
        calificaciones: req.body.calificaciones,
        isPublicada: false,
        isGrupal: req.body.isGrupal
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
            { _id: req.params.claseId },
            {$set: { nombre: req.body.nombre }},
            {$set: { materia: req.body.materia }},
            //El update solo permite updatear de a dos valores, si no no hace nada
            //{ $set: { duracion: req.body.duracion }}, //
           //{ $set: { frecuencia: req.body.frecuencia }}
           //{ $set: { costo: req.body.costo }},
           // { $set: { descripcion: req.body.descripcion }}
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
    const newComment = new Comentario({
        "usuario": req.body.usuario,
        "comentario": req.body.comentario,
        "isBloqueado": false,
        "descargo": ""
    })
    console.log(newComment)
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

exports.getClasesByValoracion = async function (req, res, next) {
    try {
        const clases = await Clase.find();  // Trae todas las clases de la BD
        const clasesSortedByValoracion = clases.sort(function(a, b) {return b.valoracion - a.valoracion});
        res.send(clasesSortedByValoracion);
    } catch (err) {
        res.json({message: err})
    }
}

exports.getClasesByValoracionMayorA = async function (req, res, next) {
    try {
        const clases = await Clase.find({valoracion : { $gte: req.params.valoracion } });  // Trae todas las clases con valoracion mayor a...
        const clasesSortedByValoracionMayorA = clases.sort(function(a, b) {return a.valoracion - b.valoracion});
        res.send(clasesSortedByValoracionMayorA);
    } catch (err) {
        res.json({message: err})
    }
}

exports.getClasesGrupales = async function (req, res, next) {
    try {
        const clasesGrupales = await Clase.find({ isGrupal: true });
        res.send(clasesGrupales);
    } catch (err) {
        res.json({message: err})
    }
}

exports.getClasesIndividuales = async function (req, res, next) {
    try {
        const clasesIndividuales = await Clase.find({ isGrupal: false });
        res.send(clasesIndividuales);
    } catch (err) {
        res.json({message: err})
    }
}

exports.getClasesByMateria = async function (req, res, next) {
    try {
        const clasesByMateria = await Clase.find({ materia: req.body.materia });
        res.send(clasesByMateria);
    } catch (err) {
        res.json({message: err})
    }
}

exports.getClasesByFrecuencia = async function (req, res, next) {
    try {
        const clasesByFrecuencia = await Clase.find({ frecuencia: req.body.frecuencia });
        res.send(clasesByFrecuencia);
    } catch (err) {
        res.json({message: err})
    }
}

exports.getClasesByDuracion = async function (req, res, next) {
    try {
        const clasesByDuracion = await Clase.find({ duracion: req.body.duracion });
        res.send(clasesByDuracion);
    } catch (err) {
        res.json({message: err})
    }
}

exports.getClasesByProfesor = async function (req, res, next) {
    try {
        const clases = await Clase.find({profesor: req.params.profesor});  // Trae todas las clases de la BD
        res.json(clases);
    } catch (err) {
        console.log(err)
        res.json({message: err})
    }
}

exports.getSolicitudesById = async function (req, res, next) {
    try {
        const clase = await Clase.findById(req.params.claseId)
        const solicitudes = clase.solicitudes
        res.send(solicitudes); 
    } catch (err) {
        console.log(err);
        res.json({message: err})
    }
}

exports.contratarClase = async function (req, res, next) {
    const newSolicitud = {
        "userId": req.body.userId,
        "usuario": req.body.nombreSolicitante,
        "estado": "Solicitada",
        "telefono": req.body.telefono,
        "mensaje": req.body.mensaje
    }
    try {
        const solicitarClase = await Clase.updateOne(
            { _id: req.params.claseId },
            { $push: { solicitudes: newSolicitud }},
        );
        res.send(solicitarClase);
    } catch (err) {
        res.json({message: err})
    }
}

exports.getSolicitudesByUserId = async function (req, res, next) {
    try {
        const solicitudes = await Solicitud.find({"idAlumno" : req.params.userId})
        res.send(solicitudes); 
    } catch (err) {
        console.log(err);
        res.json({message: err})
    }
}

exports.createSolicitud = async function (req, res, next) {
    const solicitud = new Solicitud({
        idAlumno: req.body.idAlumno,
        idClase: req.body.idClase,
        telefono: req.body.telefono,
        horario: req.body.horario,
        mensaje: req.body.mensaje,
        estado: "Solicitada",
    });
    try {
        const createdSolicitud = await solicitud.save();
        res.json(createdSolicitud);
    } catch (err) {
        res.json({message: err})
    }
}