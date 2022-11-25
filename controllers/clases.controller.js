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
        tipo: req.body.tipo,
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
            {$set: { nombre: req.body.nombre, materia: req.body.materia, duracion: req.body.duracion, frecuencia: req.body.frecuencia, costo: req.body.costo, descripcion: req.body.descripcion }}
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

exports.deleteSolicitud = async function (req, res, next) {
    try {
        const removedClase = await Solicitud.remove({_id: req.params.solicitudId});
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
        "isVisible": false,
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

exports.aceptarComentario = async function (req, res, next) {
    try {
        const updatedComentario = await Clase.updateOne(
            {comentarios: {$elemMatch:{_id: req.params.comentarioId}}},
            { $set: {"comentarios.$.isVisible": true }},
        );
        res.json(updatedComentario);
    } catch (err) {
        res.json({message: err})
    }
}
exports.rechazarComentario = async function (req, res, next) {
    try {
        const updatedComentario = await Clase.updateOne(
            {comentarios: {$elemMatch:{_id: req.params.comentarioId}}},
            { $set: {"comentarios.$.isVisible": false, "comentarios.$.isBloqueado": true}},
        );
        res.json(updatedComentario);
    } catch (err) {
        res.json({message: err})
    }
}

exports.actualizarValoracion = async function (req, res, next) {
    try {
        const idClase = req.params.claseId
        const clase = await Clase.findById(idClase);
        const solicitud = await Solicitud.find({idClase:idClase})
        console.log(solicitud)
        const calificacion = parseInt(clase.valoracion,10)
        const division = (calificacion + parseInt(req.params.valoracion))
        const average = Math.trunc(division/2)
        updateValoracionSolicitud(idClase, average)
        const updatedSolicitud = Solicitud.updateMany(
            { _id: solicitud._id },
            { $set: { valoracion: average }},
        );
        const updatedClase = await Clase.updateOne(
            { _id: idClase },
            { $set: { valoracion: average }},
        );
        res.json(updatedSolicitud);
    } catch (err) {
        res.json({message: err})
    }

    function updateValoracionSolicitud(idClase, average){
       
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

exports.getClasesByValoracion = async function (req, res, next) {
    try {
        const clases = await Clase.find({valoracion : req.params.valoracion  });
        res.send(clases);
    } catch (err) {
        res.json({message: err})
    }
}

exports.getClasesGrupales = async function (req, res, next) {
    try {
        const clasesGrupales = await Clase.find({ tipo: "Grupal" });
        res.send(clasesGrupales);
    } catch (err) {
        res.json({message: err})
    }
}

exports.getClasesIndividuales = async function (req, res, next) {
    try {
        const clasesIndividuales = await Clase.find({  tipo: "Individual" });
        res.send(clasesIndividuales);
    } catch (err) {
        res.json({message: err})
    }
}

exports.getClasesByMateria = async function (req, res, next) {
    try {
        const clasesByMateria = await Clase.find({ materia: req.params.materia });
        res.send(clasesByMateria);
    } catch (err) {
        res.json({message: err})
    }
}

exports.getClasesByFrecuencia = async function (req, res, next) {
    try {
        const clasesByFrecuencia = await Clase.find({ frecuencia: req.params.frecuencia });
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

exports.getSolicitudesByProfesor = async function (req, res, next) {
    try {
        const solicitudes = await Solicitud.find({"profesor" : req.params.nombreProfesor})
        res.send(solicitudes); 
    } catch (err) {
        console.log(err);
        res.json({message: err})
    }
}

exports.updateSolicitud = async function (req, res, next) {
    try {
        const solicitudes = await Solicitud.updateOne({"_id" : req.params.solicitudId},{$set:{"estado":req.params.estado}})
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
        costo: req.body.costo,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        materia: req.body.materia,
        profesor: req.body.profesor,
        tipo: req.body.tipo,
        frecuencia: req.body.frecuencia,
        valoracion: req.body.valoracion,
        mail: req.body.mail,
        duracion: req.body.duracion
    });
    try {
        const createdSolicitud = await solicitud.save();
        res.json(createdSolicitud);
    } catch (err) {
        res.json({message: err})
    }
}